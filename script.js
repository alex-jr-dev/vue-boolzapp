const app = new Vue({
  el: "#root",
  data: {
    contacts: [
      {
        name: "Michele",
        avatar: "imgs/avatar_1.jpg",
        visible: true,
        message: [
          {
            date: "10/01/2020 15:30:55",
            text: "Hai portato a spasso il cane?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            text: "Ricordati di dargli da mangiare",
            status: "sent",
          },
          {
            date: "10/01/2020 16:15:22",
            text: "Tutto fatto!",
            status: "received",
          },
        ],
      },
      {
        name: "Fabio",
        avatar: "imgs/avatar_2.jpg",
        visible: true,
        message: [
          {
            date: "20/03/2020 16:30:00",
            text: "Ciao come stai?",
            status: "sent",
          },
          {
            date: "20/03/2020 16:30:55",
            text: "Bene grazie! Stasera ci vediamo?",
            status: "received",
          },
          {
            date: "20/03/2020 16:35:00",
            text: "Mi piacerebbe ma devo andare a fare la spesa.",
            status: "sent",
          },
        ],
      },
      {
        name: "Samuele",
        avatar: "imgs/avatar_3.jpg",
        visible: true,
        message: [
          {
            date: "28/03/2020 10:10:40",
            text: "La Marianna va in campagna",
            status: "received",
          },
          {
            date: "28/03/2020 10:20:10",
            text: "Sicuro di non aver sbagliato chat?",
            status: "sent",
          },
          {
            date: "28/03/2020 16:15:22",
            text: "Ah scusa!",
            status: "received",
          },
        ],
      },
      {
        name: "Luisa",
        avatar: "imgs/avatar_4.jpg",
        visible: true,
        message: [
          {
            date: "10/01/2020 15:30:55",
            text: "Lo sai che ha aperto una nuova pizzeria?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            text: "Si, ma preferirei andare al cinema",
            status: "received",
          },
        ],
      },
    ],
    activeUser: {},
    userMessage: "",
    searchedContact: "",
  },

  computed: {
    activeUserLastAccess() {
      if (!this.activeUser.message) {
        return "";
      }

      const receivedMessage = this.activeUser.message.filter(
        (msg) => msg.status === "received"
      );
      const lastMessageDate = receivedMessage[receivedMessage.length - 1].date;

      return this.formatTime(lastMessageDate);
    },
    researchContact() {
      let userSearch = this.firstCharToUpperCase(this.searchedContact);
      return this.contacts.filter((user) => user.name.includes(userSearch));
    },
  },

  methods: {
    onUserClick(clickedUser) {
      this.activeUser = clickedUser;
    },
    formatTime(stringDate) {
      return moment(stringDate, "DD/MM/YYYY HH:mm:ss").format("HH:mm");
    },
    sendUserMessage() {
      this.activeUser.message.push({
        date: new Date().toLocaleString("it-IT"),
        text: this.userMessage,
        status: "sent",
      });
      setTimeout(() => {
        this.activeUser.message.push({
          date: new Date().toLocaleString("it-IT"),
          text: "Ok!",
          status: "received",
        });
      }, 1000);
      this.userMessage = "";
    },
    firstCharToUpperCase(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
});
