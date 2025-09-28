function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

Vue.createApp({
  data() {
    return {
      playerMaxHealth: 100,
      playerHealth: 100,
      monsterMaxHealth: 150,
      monsterHealth: 150,
    };
  },
  methods: {
    resolveCombat(playerMinDmg, playerMaxDmg) {
      console.log(this.playerHealth);
      this.monsterHealth = Math.max(
        0,
        this.monsterHealth - getRandomValue(playerMinDmg, playerMaxDmg)
      );

      this.playerHealth = Math.max(
        0,
        this.playerHealth - getRandomValue(8, 15)
      );
    },
    healPlayer() {
      this.playerHealth = Math.min(
        this.playerMaxHealth,
        this.playerHealth + getRandomValue(10, 20)
      );
    },
  },
  computed: {
    monsterHealthBar() {
      return (
        Math.max(0, (this.monsterHealth / this.monsterMaxHealth) * 100) + "%"
      );
    },
    playerHealthBar() {
      return (
        Math.max(0, (this.playerHealth / this.playerMaxHealth) * 100) + "%"
      );
    },
  },
  watch: {},
}).mount("#game");
