export const addProduct = (product) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('products')
        .add({
            name: product.name,
            bnName: product.bnName,
            desc: product.desc,
            bnDesc: product.bnDesc,
            measurementUnit: product.measurementUnit,
            price: parseFloat(parseFloat(product.price).toFixed(2)),
            perUnit: parseInt(product.perUnit),
            subCat: product.subCat.trim().replace(' ', '-'),
            keywords: product.keywords.trim().toLowerCase().split(","),
            url: product.url,
            imageName: product.imageName,
            createdAt: new Date()

        })
        .then(()=>{
            console.log('created successfully');
        }).catch((err)=>{
            console.log("error occured ", err);
        })
    }
}