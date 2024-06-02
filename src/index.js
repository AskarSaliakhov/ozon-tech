class ProgressRing {
    constructor(circleSelector, textSelector, inputSelector, containerSelector, animatedSwitchSelector, hiddenSwitchSelector) {
        this.circle = document.querySelector(circleSelector);
        this.progressTextInCircle = document.getElementById(textSelector);
        this.progressInput = document.getElementById(inputSelector);
        this.progressContainer = document.querySelector(containerSelector);
        this.animatedSwitch = document.getElementById(animatedSwitchSelector);
        this.hiddenSwitch = document.getElementById(hiddenSwitchSelector);

        this.radius = this.circle.r.baseVal.value;
        this.lengthCircle = 2 * Math.PI * this.radius;

        this.circle.style.strokeDasharray = `${this.lengthCircle} ${this.lengthCircle}`;
        this.circle.style.strokeDashoffset = this.lengthCircle;

        this.init();
        this.methods();
    }

    progressValue(value) {
        this.circle.style.strokeDashoffset = this.lengthCircle - (value / 100) * this.lengthCircle;
        this.progressTextInCircle.textContent = `${value}%`;
    }

    validateValue() {
        let value = parseInt(this.progressInput.value);
        if (isNaN(value) || value < 0) {
            value = 0;
        }
        if (value > 100) {
            value = 100;
            this.progressInput.value = 100;
        }
        this.progressValue(value);
    }

    validateStates() {
        if (this.animatedSwitch.checked) {
            this.progressContainer.classList.add('animated');
        } else {
            this.progressContainer.classList.remove('animated');
        }

        if (this.hiddenSwitch.checked) {
            this.progressContainer.classList.add('hidden');
        } else {
            this.progressContainer.classList.remove('hidden');
        }
    }

    init() {
        this.validateValue();
        this.validateStates();
    }

    methods() {
        window.addEventListener('load', () => this.init());

        this.progressInput.addEventListener('input', () => this.validateValue());

        this.progressInput.addEventListener('keypress', (event) => {
            if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
            }
        });

        this.animatedSwitch.addEventListener('change', () => this.validateStates());

        this.hiddenSwitch.addEventListener('change', () => this.validateStates());
    }
}

const progressRing = new ProgressRing(
    '.progress__ring__circle',
    'progress--text',
    'progress--input',
    '.progress__container',
    'animated--switch',
    'hidden--switch'
);
