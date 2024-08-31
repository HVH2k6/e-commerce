import IProduct from "./product";

interface ISale {
    id: number;
    titleSale: string;
    timeStart: Date;
    timeEnd: Date;
    listProductSale: [IProduct];
}

export default ISale;
