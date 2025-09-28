function getAttackValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
    };
  },
  methods: {
    resolveCombat() {
      this.monsterHealth -= getAttackValue(5, 12);
      this.playerHealth -= getAttackValue(8, 15);
    },
    attackMonster() {
      const attackValue = getAttackValue(5, 12);
      this.monsterHealth -= attackValue;
    },
    attackPlayer() {
      const attackValue = getAttackValue(8, 15);
      this.playerHealth -= attackValue;
    },
  },
  computed: {},
  watch: {},
}).mount("#game");
