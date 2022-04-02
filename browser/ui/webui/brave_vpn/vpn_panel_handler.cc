// Copyright (c) 2021 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

#include "brave/browser/ui/webui/brave_vpn/vpn_panel_handler.h"
#include "brave/browser/ui/webui/brave_vpn/vpn_panel_ui.h"

#include <utility>

VPNPanelHandler::VPNPanelHandler(
    mojo::PendingReceiver<brave_vpn::mojom::PanelHandler> receiver,
    VPNPanelUI* panel_controller)
    : receiver_(this, std::move(receiver)),
      panel_controller_(panel_controller) {}

VPNPanelHandler::~VPNPanelHandler() = default;

void VPNPanelHandler::ShowUI() {
  auto embedder = panel_controller_->embedder();
  if (embedder) {
    embedder->ShowUI();
  }
}

void VPNPanelHandler::CloseUI() {
  auto embedder = panel_controller_->embedder();
  if (embedder) {
    embedder->CloseUI();
  }
}
