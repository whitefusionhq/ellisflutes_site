class CheckProductStock extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({mode: "open"})
    shadow.innerHTML = "<slot></slot>"
  }

  connectedCallback() {
    const sku = this.getAttribute("sku")
    const apiUrl = document.body.dataset.apiUrl
    $.get(`${apiUrl}/is_product_locked/${sku}`, response => {
      if (response.locked) {
        this.shadowRoot.innerHTML = `
          <slot name="locked"></slot>
          <slot style="display: none"></slot>
        `
      }
    })
  }
}
customElements.define("check-product-stock", CheckProductStock)
