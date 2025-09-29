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

      surrendered: false,
    };
  },
  methods: {
    playerAttack(minDmg = 5, maxDmg = 12) {
      this.monster.currentHealth = Math.max(
        0,
        this.monster.currentHealth - getRandomValue(minDmg, maxDmg)
      );

      // Charge the special attack with one point after regular attack
      this.player.specialAttack.charge++;

      // Monster always attacks after the player
      this.monsterAttack();
    },

    monsterAttack() {
      this.player.currentHealth = Math.max(
        0,
        this.player.currentHealth - getRandomValue(8, 15)
      );
    },

    playerSpecialAttack() {
      // Special attack damage scales with the number of charges
      const specialAttackDamage =
        this.player.specialAttack.dmg * this.player.specialAttack.charge;

      this.playerAttack(specialAttackDamage, specialAttackDamage);

      this.player.specialAttack.isReady = false;
      this.player.specialAttack.charge = 0;
    },

    playerHeal() {
      this.player.currentHealth = Math.min(
        this.player.maxHealth,
        this.player.currentHealth + this.player.healing.healingAmount
      );

      this.player.healing.uses = Math.max(0, this.player.healing.uses - 1);
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

    victory() {
      return this.monster.currentHealth === 0;
    },

    gameOver() {
      return this.player.currentHealth === 0 || this.surrendered;
    },
  },
  watch: {},
}).mount("#game");
