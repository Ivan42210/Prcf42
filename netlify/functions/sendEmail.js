exports.handler = async function(event, context) {
  // 1. Vérifier la méthode HTTP
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'Méthode non autorisée' })
    };
  }

  try {
    // 2. Parser les données
    const data = JSON.parse(event.body);
    
    // 3. Validation simple
    if (!data.email || !data.message) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({ error: 'Email et message requis' })
      };
    }

    // 4. Préparer le sujet
    const subject = data.subject === 'adhérer' ? 'Demande d\'adhésion' : 'Demande d\'information';
    
    // 5. Appeler Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'contact@votresite.com',
        to: process.env.TO_EMAIL,
        subject: `Nouveau message: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #CA2E2F;">📬 Nouveau message de contact</h2>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <p><strong>👤 Nom :</strong> ${data.lastName || 'Non spécifié'}</p>
              <p><strong>👤 Prénom :</strong> ${data.firstName || 'Non spécifié'}</p>
              <p><strong>📧 Email :</strong> ${data.email}</p>
              <p><strong>🎯 Sujet :</strong> ${subject}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 10px; border-left: 4px solid #CA2E2F;">
              <h3 style="margin-top: 0;">Message :</h3>
              <p>${data.message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
              <p>Envoyé depuis votre formulaire de contact • ${new Date().toLocaleDateString('fr-FR')}</p>
            </div>
          </div>
        `,
        text: `
          NOUVEAU MESSAGE DE CONTACT
          ============================
          
          Nom: ${data.lastName || 'Non spécifié'}
          Prénom: ${data.firstName || 'Non spécifié'}
          Email: ${data.email}
          Sujet: ${subject}
          
          Message:
          ${data.message}
          
          ---
          Envoyé le ${new Date().toLocaleDateString('fr-FR')}
        `
      })
    });

    const result = await response.json();
    
    // 6. Gérer la réponse
    if (response.ok) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({ 
          success: true,
          message: 'Email envoyé avec succès'
        })
      };
    } else {
      console.error('Erreur Resend:', result);
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({ 
          error: result.message || 'Erreur lors de l\'envoi'
        })
      };
    }
    
  } catch (error) {
    console.error('Erreur:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ 
        error: 'Erreur serveur'
      })
    };
  }
};