import * as React from 'react'

// Types
import { BraveWallet, WalletAccountType } from '../../../constants/types'

// Utils
import { reduceAccountDisplayName } from '../../../utils/reduce-account-name'
import { getLocale, splitStringForTag } from '../../../../common/locale'

// Components
import { create } from 'ethereum-blockies'
import { NavButton, PanelTab } from '..'
import { CreateSiteOrigin } from '../../shared'

// Styled Components
import {
  StyledWrapper,
  AccountCircle,
  AccountNameText,
  TopRow,
  NetworkText,
  PanelTitle,
  MessageBox,
  MessageText,
  ButtonRow,
  DecryptButton
} from './style'

import { TabRow, URLText } from '../shared-panel-styles'

export interface Props {
  panelType: 'request' | 'read'
  accounts: WalletAccountType[]
  selectedNetwork: BraveWallet.NetworkInfo
  encryptionKeyPayload: BraveWallet.GetEncryptionPublicKeyRequest
  eTldPlusOne: string
  onProvideOrAllow: () => void
  onCancel: () => void
}

function EncryptionKeyPanel (props: Props) {
  const {
    panelType,
    accounts,
    selectedNetwork,
    encryptionKeyPayload,
    eTldPlusOne,
    onProvideOrAllow,
    onCancel
  } = props
  const [isDecrypted, setIsDecrypted] = React.useState<boolean>(false)

  const foundAccountName = React.useMemo(() => {
    return accounts.find((account) => account.address.toLowerCase() === encryptionKeyPayload.address.toLowerCase())?.name
  }, [encryptionKeyPayload])

  const orb = React.useMemo(() => {
    return create({ seed: encryptionKeyPayload.address.toLowerCase(), size: 8, scale: 16 }).toDataURL()
  }, [encryptionKeyPayload])

  const onDecryptMessage = () => {
    setIsDecrypted(true)
  }

  const descriptionString = getLocale('braveWalletProvideEncryptionKeyDescription').replace('$url', encryptionKeyPayload.origin.url)
  const { duringTag, afterTag } = splitStringForTag(descriptionString)

  return (
    <StyledWrapper>
      <TopRow>
        <NetworkText>{selectedNetwork.chainName}</NetworkText>
      </TopRow>
      <AccountCircle orb={orb} />
      <AccountNameText>{reduceAccountDisplayName(foundAccountName ?? '', 14)}</AccountNameText>
      {panelType === 'read' &&
        <URLText>
          <CreateSiteOrigin
            originInfo={
              {
                origin: encryptionKeyPayload.origin.url,
                eTldPlusOne: eTldPlusOne
              }
            }
          />
        </URLText>
      }
      <PanelTitle>
        {panelType === 'request'
          ? getLocale('braveWalletProvideEncryptionKeyTitle')
          : getLocale('braveWalletReadEncryptedMessageTitle')}
      </PanelTitle>
      <TabRow>
        <PanelTab
          isSelected={true}
          text={getLocale('braveWalletSignTransactionMessageTitle')}
        />
      </TabRow>
      <MessageBox
        needsCenterAlignment={panelType === 'read' && !isDecrypted}
      >
        {panelType === 'read' && !isDecrypted ? (
          <DecryptButton
            onClick={onDecryptMessage}
          >
            {getLocale('braveWalletReadEncryptedMessageDecryptButton')}
          </DecryptButton>
        ) : (
          <MessageText>
            {panelType === 'request'
              ? <>
                <CreateSiteOrigin
                  originInfo={
                    {
                      origin: duringTag ?? '',
                      eTldPlusOne: eTldPlusOne
                    }
                  } />
                {afterTag}
              </>
              : encryptionKeyPayload.message}
          </MessageText>
        )}
      </MessageBox>
      <ButtonRow>
        <NavButton
          buttonType='secondary'
          text={getLocale('braveWalletBackupButtonCancel')}
          onSubmit={onCancel}
        />
        <NavButton
          buttonType='primary'
          text={
            panelType === 'request'
              ? getLocale('braveWalletProvideEncryptionKeyButton')
              : getLocale('braveWalletReadEncryptedMessageButton')
          }
          onSubmit={onProvideOrAllow}
        />
      </ButtonRow>
    </StyledWrapper>
  )
}

export default EncryptionKeyPanel
