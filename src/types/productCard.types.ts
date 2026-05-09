export type ProductCardProps = {
    item?:any;
    productDetails:(val:any)=>void;
    isSelected:(val:boolean|string)=>any;
    incrementQuantity:(val:any)=>void;
    handleSelectProduct:(val:any)=>void;
    decrementQuantity:(val:any)=>void
}