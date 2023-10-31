<template>
    <div class="x-reflect">
        <slot></slot>
    </div>
</template>

<style scoped>
    @keyframes x-reflect-animation {
        0% {
            transform: scale(0) rotate(45deg);
            opacity: 0;
        }

        75% {
            transform: scale(0) rotate(45deg);
            opacity: 0.5;
        }

        80% {
            transform: scale(4) rotate(45deg);
            opacity: 1;
        }

        100% {
            transform: scale(50) rotate(45deg);
            opacity: 0;
        }
    }

    .x-reflect {
        position: relative;
        overflow: hidden;
    }

    .x-reflect::after {
        pointer-events: none;
        content: "";
        position: absolute;
        display: block;
        top: -180px;
        left: 0;
        height: 100%;
        width: 30px;
        opacity: 0;
        background-color: #FFFFFF;
        transform: rotate(45deg);
        animation: x-reflect-animation 5s ease-in-out infinite;
    }
</style>