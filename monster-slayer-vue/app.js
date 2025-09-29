function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

Vue.createApp({
  data() {
    return {
      player: {
        maxHealth: 100,
        currentHealth: 100,
        specialAttack: {
          dmg: 15,
          charge: 0,
        },
        healing: {
          healingAmount: 30,
          uses: 3,
        },
      },

      monster: {
        maxHealth: 150,
        currentHealth: 150,
      },

      round: 0,

      battleLogs: [],

      surrendered: false,
    };
  },
  methods: {
    playerAttack(minDmg = 5, maxDmg = 12, actionType = "attack") {
      this.round++;

      const damage = getRandomValue(minDmg, maxDmg);

      this.monster.currentHealth = Math.max(
        0,
        this.monster.currentHealth - damage
      );

      // Charge the special attack with one point after regular attack
      this.player.specialAttack.charge++;

      this.addLog("player", actionType, damage, this.round);

      // Monster always attacks after the player
      this.monsterAttack();
    },

    monsterAttack() {
      const damage = getRandomValue(8, 15);

      this.player.currentHealth = Math.max(
        0,
        this.player.currentHealth - damage
      );

      this.addLog("monster", "attack", damage, this.round);
    },

    playerSpecialAttack() {
      // Special attack damage scales with the number of charges
      const specialAttackDamage =
        this.player.specialAttack.dmg * this.player.specialAttack.charge;

      this.playerAttack(
        specialAttackDamage / 2,
        specialAttackDamage,
        "special-attack"
      );

      this.player.specialAttack.isReady = false;
      this.player.specialAttack.charge = 0;
    },

    playerHeal() {
      this.round++;

      const healingAmount = getRandomValue(
        this.player.healing.healingAmount / 2,
        this.player.healing.healingAmount
      );

      this.player.currentHealth = Math.min(
        this.player.maxHealth,
        this.player.currentHealth + healingAmount
      );

      this.addLog("player", "heal", healingAmount, this.round);
      this.player.healing.uses = Math.max(0, this.player.healing.uses - 1);

      this.monsterAttack();
    },

    addLog(actionBy, actionType, actionValue, round) {
      this.battleLogs.unshift({
        actionBy: actionBy,
        actionType: actionType,
        actionValue: actionValue,
        round: round,
      });
    },

    playerSurrender() {
      this.surrendered = true;
    },

    restart() {
      window.location.reload();
    },
  },
  computed: {
    monsterHealthBar() {
      return (
        Math.max(
          0,
          (this.monster.currentHealth / this.monster.maxHealth) * 100
        ) + "%"
      );
    },

    playerHealthBar() {
      return (
        Math.max(0, (this.player.currentHealth / this.player.maxHealth) * 100) +
        "%"
      );
    },

    isSpecialAttackReady() {
      return this.player.specialAttack.charge >= 3;
    },

    canHeal() {
      // Player can only heal if damaged and uses are available
      return (
        this.player.healing.uses > 0 &&
        this.player.currentHealth != this.player.maxHealth
      );
    },

    draw() {
      return (
        this.player.currentHealth === 0 && this.monster.currentHealth === 0
      );
    },

    victory() {
      return this.monster.currentHealth === 0;
    },

    gameOver() {
      return this.player.currentHealth === 0 || this.surrendered;
    },
  },
  watch: {},
}).mount("#game");
