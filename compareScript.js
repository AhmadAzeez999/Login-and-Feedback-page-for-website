document.addEventListener("DOMContentLoaded", function () {
    // Product information with placeholder details
    const productInfo = {
        iphone13: {
            name: "iPhone 13",
            image: "/templates/iphone13.png",
            weight: "174g",
            dimensions: "146.7 x 71.5 x 7.7mm",
            screenSize: "6.1-inch",
            resolution: "1170 x 2532",
            cpu: "A15 Bionic",
            ram: "4GB",
            storage: "128GB/256GB/512GB",
            battery: "3,240mAh",
            rearCamera: "12MP+12MP",
            frontCamera: "12MP",
            description: "The iPhone 13 is no longer a new phone, but it remains powerful, has decent battery life, and is cheaper than the new iPhone 15, while packing in similar screen specs."
        },
        iphone15: {
            name: "iPhone 15",
            image: "/templates/iphone15.jpg",
            weight: "171g",
            dimensions: "147.6 x 71.6 x 7.8mm",
            screenSize: "6.1-inch",
            resolution: "1179 x 2556",
            cpu: "A16 Bionic",
            ram: "6GB (TBC)",
            storage: "128GB/256GB/512GB",
            battery: "3,349mAh (TBC)",
            rearCamera: "48MP+12MP",
            frontCamera: "12MP",
            description: "The iPhone 15 has a lot of upgrades over the iPhone 13, including a Dynamic Island, USB-C, a 48MP camera, and a faster chipset, but it also costs more."
        },
        iphone11: {
            name: "iPhone 11",
            image: "/templates/iphone11.jpg",
            weight: "194g",
            dimensions: "150.9 x 75.7 x 8.3mm",
            screenSize: "6.1-inch",
            resolution: "828 x 1792",
            cpu: "A13 Bionic",
            ram: "4GB",
            storage: "64GB/128GB/256GB",
            battery: "3,110mAh",
            rearCamera: "12MP+12MP",
            frontCamera: "12MP",
            description: "The iPhone 11 is known for its excellent camera system and performance, offering a balance between features and price."
        },
        iphone12: {
            name: "iPhone 12",
            image: "/templates/iphone12.jpg",
            weight: "164g",
            dimensions: "146.7 x 71.5 x 7.4mm",
            screenSize: "6.1-inch",
            resolution: "1170 x 2532",
            cpu: "A14 Bionic",
            ram: "4GB",
            storage: "64GB/128GB/256GB",
            battery: "2,815mAh",
            rearCamera: "12MP+12MP",
            frontCamera: "12MP",
            description: "The iPhone 12 offers 5G support, a Super Retina XDR display, and powerful performance."
        },
        iphone8: {
            name: "iPhone 8",
            image: "/templates/iphone8.jpg",
            weight: "148g",
            dimensions: "138.4 x 67.3 x 7.3mm",
            screenSize: "4.7-inch",
            resolution: "750 x 1334",
            cpu: "A11 Bionic",
            ram: "2GB",
            storage: "64GB/256GB",
            battery: "1,821mAh",
            rearCamera: "12MP",
            frontCamera: "7MP",
            description: "The iPhone 8 is a classic, known for its compact design, reliability, and performance."
        },
    };

    function displayProductInfo(product, column) {
        // Clear the previous content
        column.innerHTML = "";

        if (product && productInfo[product]) {
            const selectedProduct = productInfo[product];
            // Create and populate product information
            const productDiv = document.createElement("div");
            productDiv.innerHTML = `<h3>${selectedProduct.name}</h3>`;
            productDiv.innerHTML += `<img src="${selectedProduct.image}" alt="${selectedProduct.name}">`; // Add image placeholder
            productDiv.innerHTML += `<p>Weight: ${selectedProduct.weight}</p>`;
            productDiv.innerHTML += `<p>Dimensions: ${selectedProduct.dimensions}</p>`;
            productDiv.innerHTML += `<p>Screen Size: ${selectedProduct.screenSize}</p>`;
            productDiv.innerHTML += `<p>Resolution: ${selectedProduct.resolution}</p>`;
            productDiv.innerHTML += `<p>CPU: ${selectedProduct.cpu}</p>`;
            productDiv.innerHTML += `<p>RAM: ${selectedProduct.ram}</p>`;
            productDiv.innerHTML += `<p>Storage: ${selectedProduct.storage}</p>`;
            productDiv.innerHTML += `<p>Battery: ${selectedProduct.battery}</p>`;
            productDiv.innerHTML += `<p>Rear Camera: ${selectedProduct.rearCamera}</p>`;
            productDiv.innerHTML += `<p>Front Camera: ${selectedProduct.frontCamera}</p>`;
            productDiv.innerHTML += `<p>Description: ${selectedProduct.description}</p>`;
            
            column.appendChild(productDiv);
        }
    }

    const column1ProductSelect = document.getElementById("selectBox1");
    const column2ProductSelect = document.getElementById("selectBox2");
    const productColumn1 = document.getElementById("product1");
    const productColumn2 = document.getElementById("product2");

    column1ProductSelect.addEventListener("change", function () {
        displayProductInfo(column1ProductSelect.value, productColumn1);
    });

    column2ProductSelect.addEventListener("change", function () {
        displayProductInfo(column2ProductSelect.value, productColumn2);
    });
});
