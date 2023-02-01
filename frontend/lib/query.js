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