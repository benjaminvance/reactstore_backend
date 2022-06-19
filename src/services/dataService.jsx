var catalog = [
    {
        _id: "00001",
        price: 32,
        stock: 12,
        title: "Banana",
        image: "img-1.jpg",
        discount: 5,
        category: "Fruit",
    },
    {
        _id: "00002",
        price: 12,
        stock: 123,
        title: "Orange",
        image: "img-2.jpg",
        discount: 6,
        category: "Fruit",
    },
    {
        _id: "00003",
        price: 14,
        stock: 69,
        title: "Apple",
        image: "img-3.jpg",
        discount: 4,
        category: "Fruit",
    },
    {
        _id: "00004",
        price: 99,
        stock: 420,
        title: "Pear",
        image: "img-4.jpg",
        discount: 3,
        category: "Fruit",
    },
    {
        _id: "00005",
        price: 80,
        stock: 12,
        title: "Watermelon",
        image: "img-5.jpg",
        discount: 2,
        category: "Fruit",
    },
]

class DataService{
    getCatalog(){

        return catalog;
    }
}

export default DataService;