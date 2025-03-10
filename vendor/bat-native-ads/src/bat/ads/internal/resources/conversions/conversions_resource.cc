/* Copyright (c) 2021 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "bat/ads/internal/resources/conversions/conversions_resource.h"

#include "base/json/json_reader.h"
#include "bat/ads/ads_client.h"
#include "bat/ads/internal/ads_client_helper.h"
#include "bat/ads/internal/logging.h"
#include "third_party/abseil-cpp/absl/types/optional.h"

namespace ads {
namespace resource {

namespace {
constexpr char kResourceId[] = "nnqccijfhvzwyrxpxwjrpmynaiazctqb";
constexpr int kVersionId = 1;
}  // namespace

Conversions::Conversions() = default;

Conversions::~Conversions() = default;

bool Conversions::IsInitialized() const {
  return is_initialized_;
}

void Conversions::Load() {
  AdsClientHelper::Get()->LoadAdsResource(
      kResourceId, kVersionId,
      [=](const bool success, const std::string& json) {
        if (!success) {
          BLOG(1, "Failed to load resource " << kResourceId);
          is_initialized_ = false;
          return;
        }

        BLOG(1, "Successfully loaded resource " << kResourceId);

        if (!FromJson(json)) {
          BLOG(1, "Failed to initialize resource " << kResourceId);
          is_initialized_ = false;
          return;
        }

        is_initialized_ = true;

        BLOG(1, "Successfully initialized resource " << kResourceId);
      });
}

ConversionIdPatternMap Conversions::get() const {
  return conversion_id_patterns_;
}

///////////////////////////////////////////////////////////////////////////////

bool Conversions::FromJson(const std::string& json) {
  ConversionIdPatternMap conversion_id_patterns;

  absl::optional<base::Value> root = base::JSONReader::Read(json);
  if (!root) {
    BLOG(1, "Failed to load from JSON, root missing");
    return false;
  }

  if (absl::optional<int> version = root->FindIntKey("version")) {
    if (kVersionId != *version) {
      BLOG(1, "Failed to load from JSON, version missing");
      return false;
    }
  }

  base::Value* conversion_id_patterns_value =
      root->FindDictKey("conversion_id_patterns");
  if (!conversion_id_patterns_value) {
    BLOG(1, "Failed to load from JSON, conversion patterns missing");
    return false;
  }

  for (const auto value : conversion_id_patterns_value->DictItems()) {
    if (!value.second.is_dict()) {
      BLOG(1, "Failed to load from JSON, conversion pattern not of type dict")
      return false;
    }

    const std::string* id_pattern = value.second.FindStringKey("id_pattern");
    if (!id_pattern || id_pattern->empty()) {
      BLOG(1, "Failed to load from JSON, pattern id_pattern missing");
      return false;
    }

    const std::string* search_in = value.second.FindStringKey("search_in");
    if (!search_in || search_in->empty()) {
      BLOG(1, "Failed to load from JSON, pattern search_in missing");
      return false;
    }

    ConversionIdPatternInfo info;
    info.id_pattern = *id_pattern;
    info.search_in = *search_in;
    info.url_pattern = value.first;
    conversion_id_patterns.insert({info.url_pattern, info});
  }

  conversion_id_patterns_ = conversion_id_patterns;

  BLOG(1, "Parsed verifiable conversion resource version " << kVersionId);

  return true;
}

}  // namespace resource
}  // namespace ads
