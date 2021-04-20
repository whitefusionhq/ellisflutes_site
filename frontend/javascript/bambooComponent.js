import bamboo from "./bamboo"

const css = input => input // no-op

const bambooStyles = css`
  :host {
    position: relative;
    z-index: 0;
    overflow: hidden;
    font-size: 16px;
    display: block;
  }

  bamboo-container {
    display: block;
    position: relative;
    z-index: 0;
    height: 100%;
  }

  .slides {
    position: relative;
    z-index: 0;  
    margin: 0;
    padding: 0;  
    display: block;
  }

  .slides>.slide {
    z-index: 0;
    overflow: hidden;
    box-sizing: border-box;
    display: block;
    background-size: cover;
    background-position: center top;
  }

  .bamboo-dots {
    position: absolute;
    z-index: 5;
    bottom: 5%;
    left: 50%;
    margin: 0px;
    padding: 0px;
    list-style: none;
    transform: translateX(-50%);
  }

  .bamboo-dots>* {
    float: left;
    width: 10px;
    height: 10px;
    margin: 2px 6px;
    transition: 0.4s ease;
    vertical-align: middle;
    border-radius: 50%;
    background: var(--bamboo-dot-inactive);
    cursor: pointer;
  }

  .bamboo-dots>*:hover {
    background: var(--bamboo-dot-active);
  }

  .bamboo-dots>*.focus {
    background: var(--bamboo-dot-active);
  }

  .bamboo-prev {
    position: absolute;
    z-index: 5;
    top: 48%;
    left: 0;
    width: 20px;
    height: 30px;
    transform: translateY(-50%);
    opacity: 0.9;
    background-color: rgba(0, 0, 0, .4);
    background-repeat: no-repeat;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYBAMAAAA46dFkAAAAIVBMVEUAAAD////////////////////////////////////////PIev5AAAACnRSTlMAENBgILDw38AwqDDuigAAACpJREFUCNdjAAOhFDDFqLUEwl1lAOEuJpvLEAXkQmm4OEwd5QIrIQISJQCMdBRInmiflAAAAABJRU5ErkJggg==');
    background-position: 50% 48%;
    background-size: 6px;
  }

  .bamboo-next {
    position: absolute;
    z-index: 5;
    top: 48%;
    right: 0;
    width: 20px;
    height: 30px;
    transform: translateY(-50%);
    opacity: 0.9;
    background-color: rgba(0, 0, 0, .4);
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYBAMAAAA46dFkAAAAIVBMVEUAAAD////////////////////////////////////////PIev5AAAACnRSTlMAENBgILDw38AwqDDuigAAAClJREFUCNdjcG9kAINZiwTANPMqRYiAFTUElsJomDhMHdlcL6gdbhAuAPqSFKIdy8kGAAAAAElFTkSuQmCC');
    background-repeat: no-repeat;
    background-position: 50% 48%;
    background-size: 6px;
  }

  .slides>* {
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity 0.6s;
  }

  .fit-img {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

class BambooSlideshow extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({mode: "open"})
    shadow.innerHTML = `
      <style>${bambooStyles}</style>
      <bamboo-container part="base"></bamboo-container>
    `
  }

  connectedCallback() {
    const speed = parseInt(this.getAttribute("speed") || 1000)
    const timeout = parseInt(this.getAttribute("timeout") || 10000)

    const container = this.shadowRoot.querySelector("bamboo-container")
    const slides = this.querySelector(".slides")
    container.append(slides)
    slides.part.add("slides")
    Array.prototype.map.call(slides.childNodes, (slide) => {
      if (slide.localName == "bamboo-slide") {
        slide.part.add("slide")
      }
    })

    this.bambooInstance = bamboo(container, "fade", {
      hideArrow: true, speed, timeout
    })
  }
}

customElements.define("bamboo-slideshow", BambooSlideshow)
