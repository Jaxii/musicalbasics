const config = {
  // lvl10
  "ownerID": "123456789123456",

  // lvl9, reboot, eval, exec, etc
  "admins": ["514294740804567040","208412136454488065","134019266394587136"],

  // lvl8, in-between role
  "dev": [],

  "token": "redacted",


  "defaultSettings" : {
    "prefix": "-",
    "modLogChannel": "mod-log",
    "modRole": "Concermasters",
    "adminRole": "Conductors",
    "systemNotice": "true", //logs command usage
    "welcomeChannel": "welcome",
    "welcomeMessage": "{{user}} joined",
    "welcomeEnabled": "false"
  },

  // permission definitions

  permLevels: [
    // non roled users
    { level: 0,
      name: "Accidentals",
      check: () => true
    },

    // This is your permission level, the staff levels should always be above the rest of the roles.
    { level: 2,
      // This is the name of the role.
      name: "Concermasters",

      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 3,
      name: "Conductors",
      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
          return (adminRole && message.member.roles.has(adminRole.id));
        } catch (e) {
          return false;
        }
      }
    },

    { level: 4,
      name: "Server Owner",
      check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
    },


    { level: 8,
      name: "Bot Dev",

      check: (message) => config.support.includes(message.author.id)
    },


    { level: 9,
      name: "Bot Admin",
      check: (message) => config.admins.includes(message.author.id)
    },


    { level: 10,
      name: "Bot Owner",

      check: (message) => message.client.config.ownerID === message.author.id
    }
  ]
};

module.exports = config;
