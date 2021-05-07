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
            popup: false,
          },
          {
            date: "10/01/2020 15:50:00",
            text: "Ricordati di dargli da mangiare",
            status: "sent",
            popup: false,
          },
          {
            date: "10/01/2020 16:15:22",
            text: "Tutto fatto!",
            status: "received",
            popup: false,
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
            popup: false,
          },
          {
            date: "20/03/2020 16:30:55",
            text: "Bene grazie! Stasera ci vediamo?",
            status: "received",
            popup: false,
          },
          {
            date: "20/03/2020 16:35:00",
            text: "Mi piacerebbe ma devo andare a fare la spesa.",
            status: "sent",
            popup: false,
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
            popup: false,
          },
          {
            date: "28/03/2020 10:20:10",
            text: "Sicuro di non aver sbagliato chat?",
            status: "sent",
            popup: false,
          },
          {
            date: "28/03/2020 16:15:22",
            text: "Ah scusa!",
            status: "received",
            popup: false,
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
            popup: false,
          },
          {
            date: "10/01/2020 15:50:00",
            text: "Si, ma preferirei andare al cinema",
            status: "received",
            popup: false,
          },
        ],
      },
    ],
    activeUser: {},
    userMessage: "",
    searchedText: "",
  },

  computed: {
    filteredUserList() {
      return this.contacts.filter((element) => {
        return element.name
          .toLowerCase()
          .includes(this.searchedText.toLowerCase());
      });
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
      const currentUser = this.activeUser;
      currentUser.message.push({
        date: moment().format("DD/MM/YYYY HH:mm:ss"),
        text: this.userMessage,
        status: "sent",
        popup: false,
      });
      this.scollToBottom();
      setTimeout(() => {
        currentUser.message.push({
          date: moment().format("DD/MM/YYYY HH:mm:ss"),
          text: "Ok!",
          status: "received",
          popup: false,
        });
        this.scollToBottom();
      }, 1000);
      this.userMessage = "";
    },

    scollToBottom() {
      this.$nextTick(() => {
        const elementHtml = this.$refs.chatContainerToScroll;

        elementHtml.scrollTop = elementHtml.scrollHeight;
      });
    },
    lastMessageTime(user) {
      if (!user.message) {
        return "";
      }

      const receivedMessage = user.message.filter(
        (msg) => msg.status === "received" || msg.status === "sent"
      );

      if (receivedMessage.length === 0) {
        return "";
      }

      const lastMessageTime = receivedMessage[receivedMessage.length - 1].date;

      return this.formatTime(lastMessageTime);
    },
    lastMessageText(user) {
      if (!user.message) {
        return "";
      }

      const receivedMessage = user.message.filter(
        (msg) => msg.status === "received" || msg.status === "sent"
      );

      if (receivedMessage.length === 0) {
        return "";
      }

      const lastMessage = receivedMessage[receivedMessage.length - 1].text;

      return lastMessage;
    },
    showPopup(message) {
      message.popup = !message.popup;
    },
    deleteMessage(index) {
      this.activeUser.message.splice(index, 1);
    },
  },

  mounted() {
    this.activeUser = this.contacts[0];
  },
});
