PetiteVue.createApp({
    bpm: 120,
    isDark: '',
    factors: [1 / 64, 1 / 32, 1 / 16, 1 / 8, 1 / 4, 1 / 2, 1, 2, 4, 8, 16, 32, 64],
    computed: PetiteVue.reactive({
        compressor: [],
        predelay: {
            plate: [], room: [], hall: []
        },
        time: {
            plate: [], room: []
        },
        delay: []
    }),
    update() {
        const bpm = this.bpm
        if (bpm < 0 || !bpm) {
            return
        }

        const baseTime = 60 * 1000 / bpm
        const values = this.factors.map(i => Math.round(i * baseTime))

        this.computed.compressor = values.filter(i => i <= 800 && i >= 50)

        this.computed.predelay.plate = values.filter(i => i >= 10 && i <= 100)
        this.computed.predelay.room = values.filter(i => i >= 10 && i <= 30)
        this.computed.predelay.hall = values.filter(i => i >= 30 && i <= 100)

        this.computed.time.room = values.filter(i => i >= 300 && i <= 1000)
        this.computed.time.hall = values.filter(i => i >= 1500 && i <= 4000)

        this.computed.delay = [64, 32, 16, 8, 4, 2].map(i => [i, Math.round(baseTime / i * 4)])
    }
}).mount('#app')


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' });
}