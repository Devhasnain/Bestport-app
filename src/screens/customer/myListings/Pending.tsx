import { TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import AppFlatlist from '@components/appFlatlist/AppFlatlist'
import { dummyJobs } from '@config/Constants'
import { Typography } from '@components/index'
import fonts from '@config/Fonts'
import colors from '@config/Colors'
import { Avatar, Badge } from '@rneui/themed'
import { navigate } from '@navigation/NavigationService'

const Pending = () => {

  const renderItems = useCallback(({item,index}:{item:any,index:number})=>{
    return (
      <TouchableOpacity 
      activeOpacity={0.9}
      onPress={()=>navigate("JobDetail")}
       style={{padding:16, elevation:12, borderRadius:14, backgroundColor:"white", minHeight:100,gap:3}} key={index}>
        <Typography fontFamily={fonts.poppinsMedium}>{item?.title}</Typography>
        <Typography fontFamily={fonts.poppinsRegular} fontSize={14} color={colors.primaryTextLight} numberOfLines={2}>{item?.description}</Typography>
        <View
        style={{
          display:"flex",
          flexDirection:"row",
          alignItems:"center",
          gap:10
        }}
        >
        <Avatar
        title='H'
        containerStyle={{backgroundColor:colors.tabBarItem}}
        rounded
        />
        <Typography fontSize={14}>User name here</Typography>
        </View>
      </TouchableOpacity>
    )
  },[])

  return (
    <AppFlatlist
    data={dummyJobs}
    renderItem={renderItems}
    contentContainerStyle={{gap:18,paddingTop:10, paddingBottom:20,paddingHorizontal:12}}
    />
  )
}

export default Pending