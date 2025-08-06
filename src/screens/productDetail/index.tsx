import { MaterialIcons, TextAccordion, Typography } from '@components/index';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import endpoints from '@api/endpoints';
import { useGet } from '@hooks/useGet';
import colors from '@config/Colors';
import fonts from '@config/Fonts';


const ProductDetail = ({route,navigation}:any) => {
    const [product,setProduct] = useState<any>(null)
    const getProductApi = useGet({endpoint:endpoints.getProductById(route?.params?.id ??""), autoFetch:route?.params?.id && !product});

    useEffect(()=>{
        if(getProductApi.data){
            setProduct(getProductApi.data?.data??null);
        }
    },[getProductApi.data]);

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
    }}
    stickyHeaderIndices={[0]}
    >
       <TouchableOpacity
       style={{
        height:40,
        width:40,
        borderWidth:0.5,
        borderColor:colors.inputplaceholder,
        marginTop:50,
        marginLeft:14,
        borderRadius:100,
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        alignContent:"center",
        position:"absolute",
        backgroundColor:colors.white
        
       }}
              onPress={() => navigation?.goBack()}
              activeOpacity={0.8}
       >
        <MaterialIcons
        style={{lineHeight:38,width:15}}
              size={20}
              name="arrow-back-ios"
              color={colors.btnPrimary}
            />
       </TouchableOpacity>

       <View
       style={{
        width:"100%",
        height:400
       }}
       >
        <Image
        source={{uri:product?.image?.path}}
        style={{
            width:"100%",
            height:"100%",
        }}
        resizeMode="cover"
        />
       </View>

       <View
       style={{
        paddingHorizontal:14,
        paddingTop:10,
        display:"flex",
        flexDirection:"column",
        gap:5
       }}
       >


       <Typography
       fontSize={22}
       fontFamily={fonts.poppinsSemiBold}
       >
        {product?.title?.trim()}
       </Typography>

       <Typography
       fontSize={20}
       fontFamily={fonts.poppinsBold}
       style={{textAlign:"right"}}
       >
        ${product?.price}
       </Typography>

       <TextAccordion
       charLimit={150}
       text={product?.description}
       />

       </View>


        
    </ScrollView>
  )
}

export default ProductDetail