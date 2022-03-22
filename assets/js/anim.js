export class CardAnim {

    constructor() {

    this.tiltEffectSettings = {
        max: 25, // max tilt rotation (degrees (deg))
        perspective: 1000, // transform perspective, the lower the more extreme the tilt gets (pixels (px))
        scale: 1.1, // transform scale - 2 = 200%, 1.5 = 150%, etc..
        speed: 500, // speed (transition-duration) of the enter/exit transition (milliseconds (ms))
        easing: "cubic-bezier(.03,.98,.52,.99)" // easing (transition-timing-function) of the enter/exit transition
    };
    }

    cardMouseEnter = (e) => {
        this.setTransition(e);
    }

    cardMouseMove = (e) => {
        const card = e.currentTarget;
        const cardWidth = card.offsetWidth;
        const cardHeight = card.offsetHeight;
        const centerX = card.offsetLeft + cardWidth/2;
        const centerY = card.offsetTop + cardHeight/2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        const rotateXUncapped = (+1)*this.tiltEffectSettings.max*mouseY/(cardHeight/2);
        const rotateYUncapped = (-1)*this.tiltEffectSettings.max*mouseX/(cardWidth/2);
        const rotateX = rotateXUncapped < -this.tiltEffectSettings.max ? -this.tiltEffectSettings.max : 
                        (rotateXUncapped > this.tiltEffectSettings.max ? this.tiltEffectSettings.max : rotateXUncapped);
        const rotateY = rotateYUncapped < -this.tiltEffectSettings.max ? -this.tiltEffectSettings.max : 
                        (rotateYUncapped > this.tiltEffectSettings.max ? this.tiltEffectSettings.max : rotateYUncapped);
        
        card.style.transform = `perspective(${this.tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) 
                                scale3d(${this.tiltEffectSettings.scale}, ${this.tiltEffectSettings.scale}, ${this.tiltEffectSettings.scale})`;
    }

    cardMouseLeave = (e) => {
        e.currentTarget.style.transform = `perspective(${this.tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }

    setTransition = (e) => {
        const card = e.currentTarget;
        clearTimeout(card.transitionTimeoutId);
        card.style.transition = `transform ${this.tiltEffectSettings.speed}ms ${this.tiltEffectSettings.easing}`;
        card.transitionTimeoutId = setTimeout(() => {
        card.style.transition = "";
      }, this.tiltEffectSettings.speed);
    }

    animCard = () => {
    let cards = document.querySelectorAll(".img");
    cards.forEach(card => {
        card.addEventListener("mouseenter", this.cardMouseEnter);
        card.addEventListener("mousemove", this.cardMouseMove);
        card.addEventListener("mouseleave", this.cardMouseLeave);
    });
    }
}