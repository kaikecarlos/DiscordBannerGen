$(document).ready(function(){
    $('#generator').on('submit', (e) => {
        e.preventDefault();
        const serverId = $('#serverId').val();
        if(serverId.split('').length !== 18 || parseInt(serverId) === NaN) {
            return Swal({
                title: 'Invalid ID',
                text: `"${serverId}" isn't a valid server ID. You need to give me a valid server ID, such as 297732013006389252 for example.`,
                type: 'error'
            });
        }
        $.get(`https://discordapp.com/api/guilds/${serverId}/widget.json`)
            .then((guild) => {
                const styleId = $('#styleId').val();
                const imageUrl = `https://discordapp.com/api/guilds/${serverId}/widget.png?style=banner${styleId}&t=${Date.now()}`;
                return Swal({
                    title: 'Gotcha!',
                    html: [`Here's the guild widget for "${guild.name}"!`,
                        '<pre><code>',
                        `HTML: ${hljs.highlightAuto(`<img src="${imageUrl}" alt="Join ${guild.name}">`).value}`,
                        `Markdown: ${hljs.highlightAuto(`![Join ${guild.name}](${imageUrl})`).value}`,
                        '</code></pre>']
                        .join('\n'),
                    imageUrl
                });
            })
            .catch((e) => {
                const cases = {
                    404: {
                        title: 'Unknown Guild',
                        text: 'It seems that the ID you submitted isn\'t a valid guild ID. Check again the guild ID you submitted.'
                    },
                    403: {
                        title: 'Widget Disabled',
                        text: 'The guild you gave me has the widget disabled. Please, talk to an admin so that they can enable the widget in that guild.'
                    }
                }
                return Swal({
                    title: cases[e.status].title,
                    text: cases[e.status].text,
                    type: 'error'
                });
        });
    });
});