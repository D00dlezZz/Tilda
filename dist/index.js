class UiProduct extends HTMLElement {

    static get observedAttributes() { return ["images","product"]; }

    get product() {
      return JSON.parse(this.getAttribute("product"));
    }

    set product(v) {
        this.setAttribute("product", JSON.stringify(v));
    }


    changeMainImg(e) {
        mainImg.src = e.src;
        for (let i = 0; i < images.length; i++) {
            images[i].classList.remove('active')
        }
        e.classList.add('active');
    }

    async fetchProduct() {
        try {
            const response = await fetch('https://store.tildacdn.com/api/tgetproduct/');
            const data = await response.json();
            this.product = data;
            this.images = JSON.parse(data.images);
        } catch(e) {
            console.error(e);
        }
    }

    async connectedCallback() {
        await this.fetchProduct();
        this.render();
        const images = document.querySelectorAll('#images');
        const mainImg = document.getElementById('mainImg');
        images[0].classList.add('active')
        images.forEach((e) => {
            e.addEventListener('click', () => this.changeMainImg(event.target))
        })
    }

    render() {
        this.innerHTML = ` 
        <section>
        <div class="product">
            <div class="product__image">
                <div class="product__switch">
                ${this.images.map((img) => {
                    return `<img src="${img.img}" alt="headphones" id="images">`
                })}
                </div>
                <div class="product__main-img">
                    <img src="${this.images[0].img}" alt="Main Photo" id="mainImg">
                </div>
            </div>
            <div class="product__main">
                <h1 class="product__title" id="title">${this.product.title}</h1>
                <div class="product__info">
                    <div class="product__quantity" id="quantity">In stok: ${this.product.quantity}</div>
                    <h3 class="product__description-title">Description:</h3>
                    <span class="product__description" id="description">${this.product.descr}</span>
                    <div class="product__price product-price">
                        <span class="product-price__current" id="price">${this.product.price} USD</span>
                        <span class="product-price__old" id="oldPrice">${this.product.priceold} USD</span>
                    </div>
                </div>
                <button class="product__add-btn">Add to cart</button>
            </div>
        </div>
    </section>
        ` 
    }
}

customElements.define('ui-proguct', UiProduct)