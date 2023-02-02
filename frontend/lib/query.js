    export const PRODUCT_QUERY =`
        query {
            products{
            data{
                attributes{
                title
                Description
                price
                slug
                image {
                    data {
                    attributes
                    {
                    formats 
                    }
                    }
                }
                }
            }
            }
        }
    `
    export const GET_PRODUCT_QUERY=`
        query getProduct($slug: String!){
            products(filters:{slug: {eq:$slug}}){
                data{
                    attributes{
                        price
                        slug
                        title
                        Description
                        image{
                            data{
                                attributes{
                                    formats
                                }
                            }
                        }
                    }
                }
            }
        }
    `;
