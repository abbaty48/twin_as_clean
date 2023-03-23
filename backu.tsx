<Tabs defaultActiveKey='0' animated centered unselectable='on' tabPosition={'bottom'}
   className={'flex-1 my-4'}
   items={[
      {
         key: '0',
         tabKey: '0',
         label: 'PhoneNumber',
         active: false,
         children: <PhoneNumberPhase />
      },
      {
         key: '1',
         tabKey: '1',
         label: 'Location',
         children: <LocationPhase />
      },
      {
         key: '2',
         tabKey: '2',
         label: 'Select Items',
         children: <SelectItemsPhase />
      },
      {
         key: '3',
         tabKey: '3',
         label: 'Summary',
         children: <SummaryPhase />
      },
   ]} />