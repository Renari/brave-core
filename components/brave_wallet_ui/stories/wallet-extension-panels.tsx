import * as React from 'react'

// Components
import {
  ConnectWithSite,
  ConnectedPanel,
  Panel,
  WelcomePanel,
  SignPanel,
  AllowAddChangeNetworkPanel,
  ConfirmTransactionPanel,
  ConnectHardwareWalletPanel,
  SitePermissions,
  AddSuggestedTokenPanel,
  TransactionsPanel,
  TransactionDetailPanel,
  AssetsPanel,
  EncryptionKeyPanel
} from '../components/extension'
import { AppList } from '../components/shared'
import {
  Send,
  Buy,
  SelectAsset,
  SelectNetwork,
  SelectAccount
} from '../components/buy-send-swap'
import {
  BraveWallet,
  WalletAccountType,
  PanelTypes,
  AppsListType,
  BuySendSwapViewTypes,
  OriginInfo
} from '../constants/types'
import {
  UpdateUnapprovedTransactionGasFieldsType,
  UpdateUnapprovedTransactionNonceType,
  UpdateUnapprovedTransactionSpendAllowanceType
} from '../common/constants/action_types'
import { AppsList } from '../options/apps-list-options'
import { filterAppList } from '../utils/filter-app-list'
import LockPanel from '../components/extension/lock-panel'
import {
  StyledExtensionWrapperLonger,
  StyledExtensionWrapper,
  ScrollContainer,
  SelectContainer,
  StyledWelcomPanel
} from './style'
import { mockNetworks } from './mock-data/mock-networks'
import { AccountAssetOptions, NewAssetOptions } from '../options/asset-options'
import { PanelTitles } from '../options/panel-titles'
import './locale'
import { transactionDummyData } from './wallet-concept'
export default {
  title: 'Wallet/Extension/Panels',
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    locked: { control: { type: 'boolean', lock: false } }
  }
}

const originInfo: OriginInfo = {
  origin: 'https://app.uniswap.org/With_A_Really_Looooooong_Site_Name/fixme',
  eTldPlusOne: 'uniswap.org'
}

const accounts: WalletAccountType[] = [
  {
    id: '1',
    name: 'Account 1',
    address: '0x7d66c9ddAED3115d93Bd1790332f3Cd06Cf52B14',
    nativeBalanceRegistry: {
      '0x1': '311780000000000000'
    },
    accountType: 'Primary',
    tokenBalanceRegistry: {},
    coin: BraveWallet.CoinType.ETH
  },
  {
    id: '2',
    name: 'Account 2',
    address: '0x73A29A1da97149722eB09c526E4eAd698895bDCf',
    nativeBalanceRegistry: {
      '0x1': '311780000000000000'
    },
    accountType: 'Primary',
    tokenBalanceRegistry: {},
    coin: BraveWallet.CoinType.ETH
  },
  {
    id: '3',
    name: 'Account 3',
    address: '0x3f29A1da97149722eB09c526E4eAd698895b426',
    nativeBalanceRegistry: {
      '0x1': '311780000000000000'
    },
    accountType: 'Primary',
    tokenBalanceRegistry: {},
    coin: BraveWallet.CoinType.ETH
  }
]

const mockDefaultCurrencies = {
  fiat: 'USD',
  crypto: 'BTC'
}

const transactionSpotPrices = [
  {
    fromAsset: 'ETH',
    toAsset: 'USD',
    price: '3300',
    assetTimeframeChange: ''
  },
  {
    fromAsset: 'BAT',
    toAsset: 'USD',
    price: '0.85',
    assetTimeframeChange: ''
  }
]

const transactionInfo: BraveWallet.TransactionInfo = {
  fromAddress: '0x7d66c9ddAED3115d93Bd1790332f3Cd06Cf52B14',
  id: '465a4d6646-kjlwf665',
  txArgs: ['0x0d8775f648430679a709e98d2b0cb6250d2887ef', '0x15ddf09c97b0000'],
  txDataUnion: {
    ethTxData1559: {
      baseData: {
        nonce: '0x1',
        gasPrice: '1',
        gasLimit: '21000',
        to: '2',
        value: '0x15ddf09c97b0000',
        data: Array.from(new Uint8Array(24))
      },
      chainId: '0x0',
      maxPriorityFeePerGas: '',
      maxFeePerGas: '',
      gasEstimation: undefined
    },
    ethTxData: undefined,
    solanaTxData: undefined,
    filTxData: undefined
  },
  txHash: '0xab834bab0000000000000000000000007be8076f4ea4a4ad08075c2508e481d6c946d12b00000000000000000000000073a29a1da971497',
  txStatus: 0,
  txParams: ['address', 'ammount'],
  txType: BraveWallet.TransactionType.ERC20Transfer,
  createdTime: { microseconds: BigInt(0) },
  submittedTime: { microseconds: BigInt(0) },
  confirmedTime: { microseconds: BigInt(0) }
}

const erc20ApproveTransactionInfo: BraveWallet.TransactionInfo = {
  ...transactionInfo,
  txType: BraveWallet.TransactionType.ERC20Approve
}

export const _ConfirmTransaction = () => {
  const onConfirmTransaction = () => {
    alert('Confirmed Transaction')
  }

  const onRejectTransaction = () => {
    alert('Rejected Transaction')
  }

  const onRejectAllTransactions = () => {
    alert('Rejected All Transaction')
  }
  const onQueueNextTransaction = () => {
    alert('Will queue next transaction in line')
  }

  const updateUnapprovedTransactionGasFields = (payload: UpdateUnapprovedTransactionGasFieldsType) => {
    alert('Updated gas fields')
  }

  const updateUnapprovedTransactionSpendAllowance = (payload: UpdateUnapprovedTransactionSpendAllowanceType) => {
    alert('Updated spending allowance')
  }

  const updateUnapprovedTransactionNonce = (payload: UpdateUnapprovedTransactionNonceType) => {
    alert('Updated nonce')
  }

  const getERC20Allowance = (recipient: string, sender: string, approvalTarget: string) => {
    return Promise.resolve('0x15ddf09c97b0000')
  }

  return (
    <StyledExtensionWrapperLonger>
      <ConfirmTransactionPanel
        defaultCurrencies={mockDefaultCurrencies}
        originInfo={originInfo}
        selectedNetwork={mockNetworks[0]}
        onQueueNextTransaction={onQueueNextTransaction}
        onRejectAllTransactions={onRejectAllTransactions}
        transactionQueueNumber={0}
        transactionsQueueLength={0}
        onConfirm={onConfirmTransaction}
        onReject={onRejectTransaction}
        accounts={accounts}
        transactionInfo={transactionInfo}
        visibleTokens={NewAssetOptions}
        transactionSpotPrices={transactionSpotPrices}
        updateUnapprovedTransactionGasFields={updateUnapprovedTransactionGasFields}
        updateUnapprovedTransactionSpendAllowance={updateUnapprovedTransactionSpendAllowance}
        updateUnapprovedTransactionNonce={updateUnapprovedTransactionNonce}
        getERC20Allowance={getERC20Allowance}
        fullTokenList={NewAssetOptions}
        gasEstimates={undefined}
      />
    </StyledExtensionWrapperLonger>
  )
}

_ConfirmTransaction.story = {
  name: 'Confirm Transaction'
}

export const _ConfirmErcApproveTransaction = () => {
  const onConfirmTransaction = () => alert('Confirmed Transaction')
  const onRejectTransaction = () => alert('Rejected Transaction')
  const onRejectAllTransactions = () => alert('Rejected All Transaction')
  const onQueueNextTransaction = () => alert('Will queue next transaction in line')
  const updateUnapprovedTransactionGasFields = () => alert('Updated gas fields')
  const updateUnapprovedTransactionSpendAllowance = () => alert('Updated spending allowance')
  const updateUnapprovedTransactionNonce = () => alert('Updated nonce')
  const getERC20Allowance = () => Promise.resolve('0x15ddf09c97b0000')

  return (
    <StyledExtensionWrapperLonger>
      <ConfirmTransactionPanel
        defaultCurrencies={mockDefaultCurrencies}
        originInfo={originInfo}
        selectedNetwork={mockNetworks[0]}
        onQueueNextTransaction={onQueueNextTransaction}
        onRejectAllTransactions={onRejectAllTransactions}
        transactionQueueNumber={0}
        transactionsQueueLength={0}
        onConfirm={onConfirmTransaction}
        onReject={onRejectTransaction}
        accounts={accounts}
        transactionInfo={erc20ApproveTransactionInfo}
        visibleTokens={NewAssetOptions}
        transactionSpotPrices={transactionSpotPrices}
        updateUnapprovedTransactionGasFields={updateUnapprovedTransactionGasFields}
        updateUnapprovedTransactionSpendAllowance={updateUnapprovedTransactionSpendAllowance}
        updateUnapprovedTransactionNonce={updateUnapprovedTransactionNonce}
        getERC20Allowance={getERC20Allowance}
        fullTokenList={NewAssetOptions}
        gasEstimates={undefined}
      />
    </StyledExtensionWrapperLonger>
  )
}

_ConfirmErcApproveTransaction.story = {
  name: 'Confirm ERC20 Approval Transaction'
}

export const _AllowAddChangeNetwork = () => {
  const onApprove = () => {
    alert('Will Approve adding or chainging networks')
  }

  const onCancel = () => {
    alert('Canceled Adding Network')
  }

  const onLearnMore = () => {
    alert('Will nav to Learn More')
  }

  return (
    <StyledExtensionWrapperLonger>
      <AllowAddChangeNetworkPanel
        originInfo={originInfo}
        panelType='change'
        onApproveAddNetwork={onApprove}
        onApproveChangeNetwork={onApprove}
        onCancel={onCancel}
        networkPayload={mockNetworks[0]}
        onLearnMore={onLearnMore}
      />
    </StyledExtensionWrapperLonger>
  )
}

_AllowAddChangeNetwork.story = {
  name: 'Allow Add or Change Network'
}

export const _SignData = () => {
  const onSign = () => {
    alert('Signed Data')
  }

  const onCancel = () => {
    alert('Canceled Signing Data')
  }

  const signMessageDataPayload = [{
    id: 0,
    address: '0x3f29A1da97149722eB09c526E4eAd698895b426',
    message: 'To avoid digital cat burglars, sign below to authenticate with CryptoKitties.'
  }]

  return (
    <StyledExtensionWrapperLonger>
      <SignPanel
        signMessageData={signMessageDataPayload}
        accounts={accounts}
        selectedNetwork={mockNetworks[0]}
        onCancel={onCancel}
        onSign={onSign}
        showWarning={true}
      />
    </StyledExtensionWrapperLonger>
  )
}

_SignData.story = {
  name: 'Sign Transaction'
}

const encryptionKeyMockPayload = {
  address: '0x3f29A1da97149722eB09c526E4eAd698895b426',
  message: 'This is a test message.',
  origin: {
    url: originInfo.origin
  }
}

export const _ProvideEncryptionKey = () => {
  const onProvide = () => {
    alert('Will Provide Encryption Key')
  }

  const onCancel = () => {
    alert('Will Cancel Providing Encryption Key')
  }

  return (
    <StyledExtensionWrapperLonger>
      <EncryptionKeyPanel
        panelType='request'
        encryptionKeyPayload={encryptionKeyMockPayload}
        accounts={accounts}
        selectedNetwork={mockNetworks[0]}
        onCancel={onCancel}
        onProvideOrAllow={onProvide}
        eTldPlusOne={originInfo.eTldPlusOne}
      />
    </StyledExtensionWrapperLonger>
  )
}

_ProvideEncryptionKey.story = {
  name: 'Provide Encryption Key'
}

export const _ReadEncryptedMessage = () => {
  const onAllow = () => {
    alert('Will Allow Reading Encrypted Message')
  }

  const onCancel = () => {
    alert('Will Not Allow Reading Encrypted Message')
  }

  return (
    <StyledExtensionWrapperLonger>
      <EncryptionKeyPanel
        panelType='read'
        encryptionKeyPayload={encryptionKeyMockPayload}
        accounts={accounts}
        selectedNetwork={mockNetworks[0]}
        onCancel={onCancel}
        onProvideOrAllow={onAllow}
        eTldPlusOne={originInfo.eTldPlusOne}
      />
    </StyledExtensionWrapperLonger>
  )
}

_ReadEncryptedMessage.story = {
  name: 'Read Encrypted Message'
}

export const _ConnectWithSite = () => {
  const [selectedAccounts, setSelectedAccounts] = React.useState<WalletAccountType[]>([
    accounts[0]
  ])
  const [readyToConnect, setReadyToConnect] = React.useState<boolean>(false)
  const selectAccount = (account: WalletAccountType) => {
    const newList = [...selectedAccounts, account]
    setSelectedAccounts(newList)
  }
  const removeAccount = (account: WalletAccountType) => {
    const newList = selectedAccounts.filter(
      (accounts) => accounts.id !== account.id
    )
    setSelectedAccounts(newList)
  }
  const onSubmit = () => {
    alert(`Connecting to ${originInfo.origin} using: ${JSON.stringify(selectedAccounts)}`)
  }
  const primaryAction = () => {
    if (!readyToConnect) {
      setReadyToConnect(true)
    } else {
      onSubmit()
    }
  }
  const secondaryAction = () => {
    if (readyToConnect) {
      setReadyToConnect(false)
    } else {
      alert('You Clicked The Cancel Button!')
    }
  }
  return (
    <StyledExtensionWrapperLonger>
      <ConnectWithSite
        originInfo={originInfo}
        isReady={readyToConnect}
        accounts={accounts}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        selectAccount={selectAccount}
        removeAccount={removeAccount}
        selectedAccounts={selectedAccounts}
      />
    </StyledExtensionWrapperLonger>
  )
}

_ConnectWithSite.story = {
  name: 'Connect With Site'
}

const transactionDummyAccounts: WalletAccountType[] = [
  {
    id: '1',
    name: 'Account 1',
    address: '1',
    nativeBalanceRegistry: {
      '0x1': '311780000000000000'
    },
    accountType: 'Primary',
    tokenBalanceRegistry: {},
    coin: BraveWallet.CoinType.ETH
  }
]

const transactionList = {
  [transactionDummyAccounts[0].address]: [
    ...transactionDummyData[1],
    ...transactionDummyData[2]
  ]
}

export const _ConnectedPanel = (args: { locked: boolean }) => {
  const { locked } = args
  const [inputValue, setInputValue] = React.useState<string>('')
  const [walletLocked, setWalletLocked] = React.useState<boolean>(locked)
  const [selectedPanel, setSelectedPanel] = React.useState<PanelTypes>('main')
  const [panelTitle, setPanelTitle] = React.useState<string>('main')
  const [selectedAccount, setSelectedAccount] = React.useState<WalletAccountType>(
    accounts[0]
  )
  const [favoriteApps, setFavoriteApps] = React.useState<BraveWallet.AppItem[]>([
    AppsList()[0].appList[0]
  ])
  const [filteredAppsList, setFilteredAppsList] = React.useState<AppsListType[]>(AppsList())
  const [hasPasswordError, setHasPasswordError] = React.useState<boolean>(false)
  const [selectedNetwork, setSelectedNetwork] = React.useState<BraveWallet.NetworkInfo>(mockNetworks[0])
  const [selectedWyreAsset, setSelectedWyreAsset] = React.useState<BraveWallet.BlockchainToken>(AccountAssetOptions[0])
  const [selectedAsset, setSelectedAsset] = React.useState<BraveWallet.BlockchainToken>(AccountAssetOptions[0])
  const [showSelectAsset, setShowSelectAsset] = React.useState<boolean>(false)
  const [toAddress, setToAddress] = React.useState('')
  const [fromAmount, setFromAmount] = React.useState('')
  const [buyAmount, setBuyAmount] = React.useState('')
  const [selectedTransaction, setSelectedTransaction] = React.useState<BraveWallet.TransactionInfo | undefined>(transactionList[1][0])

  const onSetBuyAmount = (value: string) => {
    setBuyAmount(value)
  }

  const onSubmitBuy = () => {
    alert(`Buy ${selectedWyreAsset.symbol} asset`)
  }

  const onChangeSendView = (view: BuySendSwapViewTypes) => {
    if (view === 'assets') {
      setShowSelectAsset(true)
    }
  }

  const onBack = () => {
    setSelectedPanel('main')
  }

  const onBackToTransactions = () => {
    navigateTo('transactions')
  }

  const onSelectNetwork = (network: BraveWallet.NetworkInfo) => () => {
    setSelectedNetwork(network)
    setSelectedPanel('main')
  }

  const onSelectAccount = (account: WalletAccountType) => () => {
    setSelectedAccount(account)
    setSelectedPanel('main')
  }

  const onHideSelectAsset = () => {
    setShowSelectAsset(false)
  }

  const onSelectAsset = (asset: BraveWallet.BlockchainToken) => () => {
    if (selectedPanel === 'buy') {
      setSelectedWyreAsset(asset)
    } else {
      setSelectedAsset(asset)
    }
    setShowSelectAsset(false)
  }

  const onInputChange = (value: string, name: string) => {
    if (name === 'address') {
      setToAddress(value)
    } else {
      setFromAmount(value)
    }
  }

  const getTitle = (path: PanelTypes) => {
    const title = PanelTitles().find((title) => path === title.id)
    setPanelTitle(title ? title.title : '')
  }

  const navigateTo = (path: PanelTypes) => {
    if (path === 'expanded') {
      alert('This will expand to main wallet!')
    } else {
      setSelectedPanel(path)
    }
    getTitle(path)
  }

  const browseMore = () => {
    alert('Will expand to view more!')
  }

  const addToFavorites = (app: BraveWallet.AppItem) => {
    const newList = [...favoriteApps, app]
    setFavoriteApps(newList)
  }
  const removeFromFavorites = (app: BraveWallet.AppItem) => {
    const newList = favoriteApps.filter(
      (fav) => fav.name !== app.name
    )
    setFavoriteApps(newList)
  }

  const filterList = (event: any) => {
    filterAppList(event, AppsList(), setFilteredAppsList)
  }

  const unlockWallet = () => {
    if (inputValue !== 'password') {
      setHasPasswordError(true)
    } else {
      setWalletLocked(false)
    }
  }

  const onLockWallet = () => {
    setWalletLocked(true)
  }

  const onSelectPresetAmount = (percent: number) => {
    const amount = Number(selectedAccount.nativeBalanceRegistry[0]) * percent
    setFromAmount(amount.toString())
  }

  const handlePasswordChanged = (value: string) => {
    setHasPasswordError(false)
    setInputValue(value)
  }

  const onSubmitSend = () => {
    alert('Will submit Send')
  }

  const onOpenSettings = () => {
    alert('Will go to Wallet Settings')
  }

  const onRestore = () => {
    alert('Will navigate to full wallet restore page')
  }

  const onDisconnectFromOrigin = (origin: string, address: string) => {
    console.log(`Will disconnect ${address} from ${origin}`)
  }

  const onConnectToOrigin = (origin: string, account: WalletAccountType) => {
    console.log(`Will connect ${account.address} to ${origin}`)
  }

  const onAddAccount = () => {
    console.log('Will Expand to the Accounts Page')
  }

  const onAddNetwork = () => {
    console.log('Will redirect user to network settings')
  }

  const onAddAsset = () => {
    alert('Will redirect to brave://wallet/crypto/portfolio/add-asset')
  }

  const onClickRetryTransaction = () => {
    // Does nothing in storybook
    alert('Will retry transaction')
  }

  const onClickCancelTransaction = () => {
    // Does nothing in storybook
    alert('Will cancel transaction')
  }

  const onClickSpeedupTransaction = () => {
    // Does nothing in storybook
    alert('Will speedup transaction')
  }

  const connectedAccounts = accounts.slice(0, 2)

  const onSelectTransaction = (transaction: BraveWallet.TransactionInfo) => {
    navigateTo('transactionDetails')
    setSelectedTransaction(transaction)
    console.log(selectedTransaction)
  }

  return (
    <StyledExtensionWrapper>
      {walletLocked ? (
        <LockPanel
          hasPasswordError={hasPasswordError}
          onSubmit={unlockWallet}
          disabled={inputValue === ''}
          onPasswordChanged={handlePasswordChanged}
          onClickRestore={onRestore}
        />
      ) : (
        <>
          {selectedPanel === 'main' ? (
            <ConnectedPanel
              spotPrices={[]}
              defaultCurrencies={mockDefaultCurrencies}
              selectedNetwork={selectedNetwork}
              selectedAccount={selectedAccount}
              isConnected={true}
              navAction={navigateTo}
              onLockWallet={onLockWallet}
              onOpenSettings={onOpenSettings}
              originInfo={originInfo}
              isSwapSupported={true}
            />
          ) : (
            <>
              {showSelectAsset &&
                <SelectContainer>
                  <SelectAsset
                    assets={AccountAssetOptions}
                    selectedNetwork={selectedNetwork}
                    onSelectAsset={onSelectAsset}
                    onBack={onHideSelectAsset}
                    onAddAsset={onAddAsset}
                  />
                </SelectContainer>
              }
              {selectedPanel === 'accounts' &&
                <SelectContainer>
                  <SelectAccount
                    accounts={accounts}
                    onBack={onBack}
                    onSelectAccount={onSelectAccount}
                    onAddAccount={onAddAccount}
                    hasAddButton={true}
                    selectedAccount={selectedAccount}
                  />
                </SelectContainer>
              }
              {selectedPanel === 'networks' &&
                <SelectContainer>
                  <SelectNetwork
                    selectedNetwork={selectedNetwork}
                    networks={mockNetworks}
                    onBack={onBack}
                    onSelectNetwork={onSelectNetwork}
                    hasAddButton={true}
                    onAddNetwork={onAddNetwork}
                  />
                </SelectContainer>
              }
              {selectedPanel === 'transactionDetails' && selectedTransaction &&
                <SelectContainer>
                  <TransactionDetailPanel
                    transaction={selectedTransaction}
                    onBack={onBackToTransactions}
                    onCancelTransaction={onClickCancelTransaction}
                    onRetryTransaction={onClickRetryTransaction}
                    onSpeedupTransaction={onClickSpeedupTransaction}
                    accounts={accounts}
                    defaultCurrencies={mockDefaultCurrencies}
                    selectedNetwork={mockNetworks[0]}
                    visibleTokens={NewAssetOptions}
                    transactionSpotPrices={[]}
                  />
                </SelectContainer>
              }
              {!showSelectAsset && selectedPanel !== 'networks' && selectedPanel !== 'accounts' && selectedPanel !== 'transactionDetails' &&
                < Panel
                  navAction={navigateTo}
                  title={panelTitle}
                  useSearch={selectedPanel === 'apps'}
                  searchAction={selectedPanel === 'apps' ? filterList : undefined}
                >
                  <ScrollContainer>
                    {selectedPanel === 'apps' &&
                      <AppList
                        list={filteredAppsList}
                        favApps={favoriteApps}
                        addToFav={addToFavorites}
                        removeFromFav={removeFromFavorites}
                        action={browseMore}
                      />
                    }
                    {selectedPanel === 'send' &&
                      <Send
                        onChangeSendView={onChangeSendView}
                        onInputChange={onInputChange}
                        onSelectPresetAmount={onSelectPresetAmount}
                        onSubmit={onSubmitSend}
                        addressError=''
                        addressWarning=''
                        selectedAsset={selectedAsset}
                        selectedAssetAmount={fromAmount}
                        selectedAssetBalance={(selectedAccount.nativeBalanceRegistry)[selectedAsset.chainId]}
                        toAddressOrUrl={toAddress}
                        toAddress={toAddress}
                        amountValidationError={undefined}
                        selectedNetwork={selectedNetwork}
                      />
                    }
                    {selectedPanel === 'buy' &&
                      <Buy
                        defaultCurrencies={mockDefaultCurrencies}
                        onChangeBuyView={onChangeSendView}
                        onInputChange={onSetBuyAmount}
                        onSubmit={onSubmitBuy}
                        selectedAsset={selectedWyreAsset}
                        buyAmount={buyAmount}
                        selectedNetwork={selectedNetwork}
                        networkList={[]}
                      />
                    }
                    {selectedPanel === 'sitePermissions' &&
                      <SitePermissions
                        selectedAccount={selectedAccount}
                        originInfo={originInfo}
                        onDisconnect={onDisconnectFromOrigin}
                        connectedAccounts={connectedAccounts}
                        accounts={accounts}
                        onSwitchAccount={onSelectAccount}
                        onConnect={onConnectToOrigin}
                        onAddAccount={onAddAccount}
                      />
                    }
                    {selectedPanel === 'transactions' &&
                      <TransactionsPanel
                        accounts={transactionDummyAccounts}
                        defaultCurrencies={mockDefaultCurrencies}
                        onSelectTransaction={onSelectTransaction}
                        selectedNetwork={mockNetworks[0]}
                        selectedAccount={transactionDummyAccounts[0]}
                        visibleTokens={NewAssetOptions}
                        transactionSpotPrices={[]}
                        transactions={transactionList}

                      />
                    }
                    {selectedPanel === 'assets' &&
                      <AssetsPanel
                        defaultCurrencies={mockDefaultCurrencies}
                        selectedAccount={selectedAccount}
                        spotPrices={[]}
                        userAssetList={AccountAssetOptions}
                        onAddAsset={onAddAsset}
                        networkList={[selectedNetwork]}
                      />
                    }
                  </ScrollContainer>
                </Panel>
              }
            </>
          )}
        </>
      )
      }
    </StyledExtensionWrapper >
  )
}

_ConnectedPanel.args = {
  locked: false
}

_ConnectedPanel.story = {
  name: 'Connected With Site'
}

export const _SetupWallet = () => {
  const onSetup = () => {
    alert('Will navigate to full wallet onboarding page')
  }

  return (
    <StyledWelcomPanel>
      <WelcomePanel onSetup={onSetup} />
    </StyledWelcomPanel>
  )
}

_SetupWallet.story = {
  name: 'Setup New Wallet'
}

export const _ConnectHardwareWallet = () => {
  const onCancel = () => {
    // Doesn't do anything in storybook
  }

  const onConfirmTransaction = () => {
    // Doesn't do anything in storybook
  }

  const onClickInstructions = () => {
    // Open support link in new tab
    window.open('https://support.brave.com/hc/en-us/articles/4409309138701', '_blank')
  }

  return (
    <StyledExtensionWrapper>
      <ConnectHardwareWalletPanel
        walletName='Ledger 1'
        onCancel={onCancel}
        retryCallable={onConfirmTransaction}
        onClickInstructions={onClickInstructions}
        hardwareWalletCode={undefined}
      />
    </StyledExtensionWrapper>
  )
}

_ConnectHardwareWallet.story = {
  name: 'Connect Hardware Wallet'
}

export const _AddSuggestedToken = () => {
  const onCancel = () => {
    // Doesn't do anything in storybook
  }

  const onAddToken = () => {
    // Doesn't do anything in storybook
  }

  return (
    <StyledExtensionWrapper>
      <AddSuggestedTokenPanel
        onCancel={onCancel}
        onAddToken={onAddToken}
        token={NewAssetOptions[2]}
        selectedNetwork={mockNetworks[0]}
      />
    </StyledExtensionWrapper>
  )
}

_AddSuggestedToken.story = {
  name: 'Add Suggested Token'
}

export const _TransactionDetail = () => {
  const mockedFunction = () => {
    // Doesn't do anything in storybook
  }

  const tx = transactionList[transactionDummyAccounts[0].address][0]
  return (
    <StyledExtensionWrapper>
      <Panel
        navAction={mockedFunction}
        title={'Recent Transactions'}
        useSearch={false}
        searchAction={undefined}
      >
        <ScrollContainer>
          <TransactionDetailPanel
            onBack={mockedFunction}
            onCancelTransaction={mockedFunction}
            onRetryTransaction={mockedFunction}
            onSpeedupTransaction={mockedFunction}
            accounts={transactionDummyAccounts}
            defaultCurrencies={mockDefaultCurrencies}
            selectedNetwork={mockNetworks[0]}
            visibleTokens={NewAssetOptions}
            transactionSpotPrices={[]}
            transaction={tx}
          />
        </ScrollContainer>
      </Panel>
    </StyledExtensionWrapper>
  )
}

_TransactionDetail.story = {
  name: 'Transactions Detail'
}

export const _RecentTransaction = () => {
  const onSelectTransaction = () => {
    // Doesn't do anything in storybook
  }

  const navigateTo = () => {
    // Doesn't do anything in storybook
  }

  return (
    <StyledExtensionWrapper>
      <Panel
        navAction={navigateTo}
        title={'Recent Transactions'}
        useSearch={false}
        searchAction={undefined}
      >
        <ScrollContainer>
          <TransactionsPanel
            accounts={transactionDummyAccounts}
            defaultCurrencies={mockDefaultCurrencies}
            onSelectTransaction={onSelectTransaction}
            selectedNetwork={mockNetworks[0]}
            selectedAccount={transactionDummyAccounts[0]}
            visibleTokens={NewAssetOptions}
            transactionSpotPrices={[{ assetTimeframeChange: '', fromAsset: 'ETH', toAsset: 'USD', price: '2500' }]}
            transactions={transactionList}
          />
        </ScrollContainer>
      </Panel>
    </StyledExtensionWrapper>
  )
}

_RecentTransaction.story = {
  name: 'Recent Transactions'
}
