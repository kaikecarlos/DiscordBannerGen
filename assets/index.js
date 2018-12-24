$(document).ready(function(){
    $('#generator').on('submit', (e) => {
        e.preventDefault();
        if($('#serverId').val() == '') alert('You have to insert a valid id!');
        let serverId = $('#serverId').val();
        let styleId = $('#styleId').val();
        const finalUrl = `https://discordapp.com/api/guilds/${serverId}/widget.png?style=banner${styleId}&t=1512006306528`;
        // Check if got unknow guild
        Swal({
            title: 'Gotcha!',
            text: 'I found this',
            imageUrl: finalUrl,
            imageAlt: 'If you are seeing this, it means that it gave some problem, maybe the id is incorrect or the widgets of your server is disabled'
        });
    });
});
