require('dotenv').config();
const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers 
    ]
});

// Tabela de mapeamento de segurança em memória: ID do Discord -> E-mail Institucional
const registroEstudantes = {};

client.once('ready', () => {
    console.log(`🚀 Unifoco online • Modo Produtividade Pura Ativado!`);
});

// 1. MONITOR DE COMANDOS DE TEXTO (!pomodoro e !registrar)
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Comando administrativo para gerar o painel centralizado de foco
    if (message.content === '!pomodoro') {
        setTimeout(() => message.delete().catch(() => null), 1000);

        const painelEmbed = new EmbedBuilder()
            .setColor('#E74C3C')
            .setTitle('⏱️ Central de Produtividade Acadêmica - Unifoco')
            .setDescription('Gerencie seu tempo de estudos para as disciplinas Híbridas e Semi-EAD do 5º Período!\n\n⚠️ **Atenção:** Para utilizar a ferramenta de foco, vincule sua identidade estudantil digitando no chat:\n`!registrar seu_email@souunisales.com.br`')
            .setFooter({ text: 'Ambiente controlado • Foco na aprendizagem real' })
            .setThumbnail(client.user.displayAvatarURL());

        const botoesAcao = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('disparar_cronometro_individual')
                    .setLabel('Iniciar Meu Pomodoro')
                    .setEmoji('⚡')
                    .setStyle(ButtonStyle.Success)
            );

        await message.channel.send({ embeds: [painelEmbed], components: [botoesAcao] });
    }

    // COMANDO DE SEGURANÇA: Vínculo estrito com o domínio oficial informado
    if (message.content.startsWith('!registrar')) {
        setTimeout(() => message.delete().catch(() => null), 1000); // Oculta o e-mail do histórico público imediatamente
        
        const args = message.content.split(' ');
        const email = args[1];

        // Validação exata com o padrão solicitado: @souunisales.com.br
        if (!email || !email.includes('@') || !email.endsWith('souunisales.com.br')) {
            const erroMsg = await message.reply('❌ **Erro de Validação:** Use seu e-mail institucional oficial da UniSales (ex: `nome@souunisales.com.br`).');
            setTimeout(() => erroMsg.delete().catch(() => null), 8000);
            return;
        }

        const alunoId = message.author.id;
        registroEstudantes[alunoId] = email; 

        // Altera o apelido do aluno dinamicamente para o padrão formal exigido pelos docentes
        try {
            const prefixoEmail = email.split('@')[0].replace('.', ' '); 
            const nomeFormatado = prefixoEmail.split(' ').map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1)).join(' ');
            await message.member.setNickname(`🎓 ${nomeFormatado}`).catch(() => null);
        } catch (e) {
            console.log("Aviso: Falha ao alterar apelido (Usuário com permissões de administrador superiores ao bot).");
        }

        const sucessoMsg = await message.channel.send(`✅ **Identidade Vinculada!** Aluno <@${alunoId}> registrado com sucesso. Seu cronômetro individual está liberado!`);
        setTimeout(() => sucessoMsg.delete().catch(() => null), 10000);
    }
});

// 2. MONITOR DO CRONÔMETRO DE PRODUTIVIDADE INDIVIDUAL (RESOLVIDO)
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'disparar_cronometro_individual') {
        const alunoId = interaction.user.id;

        // TRAVA PEDAGÓGICA: Exige a vinculação estudantil antes de liberar o uso
        if (!registroEstudantes[alunoId]) {
            await interaction.reply({ 
                content: `❌ **Acesso Bloqueado:** Este é um ambiente acadêmico formal do 5º período.\nPor favor, registre sua identidade estudantil digitando no chat:\n` + '`!registrar seu_email@souunisales.com.br`', 
                ephemeral: true 
            });
            return;
        }

        // Resposta efêmera oficial inicial para dar baixa na interação com a API do Discord
        await interaction.reply({ 
            content: `▶️ **Pomodoro Iniciado!** Bons estudos, <@${alunoId}>. O bot te notificará aqui na sala quando o ciclo terminar. Força!`, 
            ephemeral: true 
        });

        const tempoFoco = 10000; // 10 segundos para fins de simulação e testes rápidos do grupo

        setTimeout(async () => {
            try {
                const concluidoEmbed = new EmbedBuilder()
                    .setColor('#2ECC71')
                    .setTitle('🎉 Ciclo Concluído!')
                    .setDescription(`Parabéns, <@${alunoId}>! Você concluiu seus **25 minutos** de estudo focado.\n\n☕ **Hora do Descanso:** Faça uma pausa de **5 minutos** para esticar as pernas e tomar uma água antes do próximo bloco.`)
                    .setFooter({ text: 'Mantenha a constância em suas matérias digitais!' })
                    .setTimestamp();
                
                // ✅ CORREÇÃO AQUI: Usando followUp público para notificar o canal sem quebrar a interação original
                const messageAlerta = await interaction.followUp({ 
                    content: `🔔 **Notificação de Horário:** <@${alunoId}>`, 
                    embeds: [concluidoEmbed],
                    ephemeral: false // Garante que a conclusão apareça publicamente na sala para a comunidade ver
                });
                
                // 🔥 AUTO-DELETE: Remove o card em 15 segundos para manter a sala limpa
                setTimeout(() => messageAlerta.delete().catch(() => null), 15000);
            } catch (error) {
                console.error("Erro ao enviar mensagem de conclusão:", error);
            }

        }, tempoFoco);
    }
});

client.login(process.env.DISCORD_TOKEN);