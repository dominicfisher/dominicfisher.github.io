;
((window, document) => {
    "use strict";

    const pluginName = 'particleground';
    const $ = window.jQuery;

    function extend(out, ...args) {
        out = out || {};
        for (let i = 0; i < args.length; i++) {
            const obj = args[i];
            if (!obj) continue;
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object')
                        extend(out[key], obj[key]);
                    else
                        out[key] = obj[key];
                }
            }
        }
        return out;
    }

    function Plugin(element, options) {
        const canvasSupport = !!document.createElement('canvas').getContext;
        let canvas, ctx, particles = [], raf, mouseX = 0, mouseY = 0, winW, winH, desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
        let orientationSupport = !!window.DeviceOrientationEvent, tiltX = 0, pointerX, pointerY, tiltY = 0, paused = false;

        options = extend({}, window[pluginName].defaults, options);

        function init() {
            if (!canvasSupport) return;

            canvas = document.createElement('canvas');
            canvas.className = 'pg-canvas';
            canvas.style.display = 'block';
            element.insertBefore(canvas, element.firstChild);
            ctx = canvas.getContext('2d');
            styleCanvas();

            const numParticles = Math.round((canvas.width * canvas.height) / options.density);
            for (let i = 0; i < numParticles; i++) {
                const p = new Particle();
                p.setStackPos(i);
                particles.push(p);
            }

            window.addEventListener('resize', () => resizeHandler(), false);

            document.addEventListener('mousemove', (e) => {
                mouseX = e.pageX;
                mouseY = e.pageY;
            }, false);

            document.body.addEventListener("mousemove", (event) => {
                const cursor = document.getElementById("cursor22");
                const x = event.pageX - cursor.width + 7;
                const y = event.pageY - 7;
                cursor.style.left = x;
                cursor.style.top = y;
            });

            if (orientationSupport && !desktop) {
                window.addEventListener('deviceorientation', () => {
                    tiltY = Math.min(Math.max(-event.beta, -30), 30);
                    tiltX = Math.min(Math.max(-event.gamma, -30), 30);
                }, true);
            }

            draw();
            hook('onInit');
        }

        function styleCanvas() {
            canvas.width = element.offsetWidth;
            canvas.height = element.offsetHeight;
            ctx.fillStyle = options.dotColor;
            ctx.strokeStyle = options.lineColor;
            ctx.lineWidth = options.lineWidth;
        }

        function draw() {
            if (!canvasSupport) return;

            winW = window.innerWidth;
            winH = window.innerHeight;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].updatePosition();
            }

            for (let i = 0; i < particles.length; i++) {
                particles[i].draw();
            }

            if (!paused) {
                raf = requestAnimationFrame(draw);
            }
        }

        function resizeHandler() {
            styleCanvas();

            const elWidth = element.offsetWidth;
            const elHeight = element.offsetHeight;

            for (let i = particles.length - 1; i >= 0; i--) {
                if (particles[i].position.x > elWidth || particles[i].position.y > elHeight) {
                    particles.splice(i, 1);
                }
            }

            const numParticles = Math.round((canvas.width * canvas.height) / options.density);
            if (numParticles > particles.length) {
                while (numParticles > particles.length) {
                    const p = new Particle();
                    particles.push(p);
                }
            } else if (numParticles < particles.length) {
                particles.splice(numParticles);
            }

            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].setStackPos(i);
            }
        }

        function pause() {
            paused = true;
        }

        function start() {
            paused = false;
            draw();
        }

        function Particle() {
            this.stackPos;
            this.active = true;
            this.layer = Math.ceil(Math.random() * 3);
            this.parallaxOffsetX = 0;
            this.parallaxOffsetY = 0;
            this.position = {
                x: Math.ceil(Math.random() * canvas.width),
                y: Math.ceil(Math.random() * canvas.height)
            };
            this.speed = {};
            switch (options.directionX) {
                case 'left':
                    this.speed.x = +(-options.maxSpeedX + (Math.random() * options.maxSpeedX) - options.minSpeedX).toFixed(2);
                    break;
                case 'right':
                    this.speed.x = +((Math.random() * options.maxSpeedX) + options.minSpeedX).toFixed(2);
                    break;
                default:
                    this.speed.x = +((-options.maxSpeedX / 2) + (Math.random() * options.maxSpeedX)).toFixed(2);
                    this.speed.x += this.speed.x > 0 ? options.minSpeedX : -options.minSpeedX;
                    break;
            }
            switch (options.directionY) {
                case 'up':
                    this.speed.y = +(-options.maxSpeedY + (Math.random() * options.maxSpeedY) - options.minSpeedY).toFixed(2);
                    break;
                case 'down':
                    this.speed.y = +((Math.random() * options.maxSpeedY) + options.minSpeedY).toFixed(2);
                    break;
                default:
                    this.speed.y = +((-options.maxSpeedY / 2) + (Math.random() * options.maxSpeedY)).toFixed(2);
                    this.speed.x += this.speed.y > 0 ? options.minSpeedY : -options.minSpeedY;
                    break;
            }
        }

        Particle.prototype.draw = function() {
            ctx.beginPath();
            ctx.arc(this.position.x + this.parallaxOffsetX, this.position.y + this.par

