# Portfolio MOROU Salahou dine

Portfolio professionnel d'un étudiant ingénieur à l'École Centrale Casablanca, spécialisé en Intelligence Artificielle, Data Science et Cybersécurité.

## Structure du projet

```
portfolio/
├── index.html          # Page d'accueil
├── about.html          # Page Profil
├── projects.html       # Page Projets (détaillés)
├── skills.html         # Page Compétences
├── hackathons.html     # Page Hackathons & Compétitions
├── contact.html        # Page Contact
├── css/
│   ├── variables.css   # Design system (couleurs, typo, espacements)
│   ├── base.css        # Reset et styles de base
│   ├── components.css  # Composants réutilisables
│   ├── layout.css      # Navigation, footer, grilles
│   └── pages.css       # Styles spécifiques aux pages
├── js/
│   └── main.js         # JavaScript (navigation, filtres, animations)
└── assets/
    ├── favicon.svg     # Favicon du site
    └── cv-morou-salahou-dine.pdf  # CV à télécharger (à ajouter)
```

## Lancer le site en local

Le site est statique et ne nécessite pas de serveur backend. Pour le visualiser :

### Option 1 : Ouvrir directement
Double-cliquer sur `index.html` pour l'ouvrir dans un navigateur.

### Option 2 : Serveur local (recommandé)
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (npx)
npx serve .

# Avec VS Code
# Installer l'extension "Live Server" et clic droit > "Open with Live Server"
```

Puis ouvrir `http://localhost:8000` dans un navigateur.

## Personnalisation

### Informations personnelles
- Modifier les coordonnées dans `contact.html`
- Mettre à jour les liens GitHub et LinkedIn dans le footer de chaque page
- Ajouter votre CV en PDF dans le dossier `assets/`

### Projets
Chaque projet dans `projects.html` suit la structure :
- Problème adressé
- Contexte (académique, hackathon, personnel)
- Données utilisées
- Approche technique
- Technologies
- Résultats obtenus
- Limites identifiées
- Pistes d'amélioration

### Compétences
Dans `skills.html`, les compétences sont organisées par catégorie avec :
- Niveau (Débutant / Intermédiaire / Avancé)
- Barre de progression visuelle
- Lien vers les projets où la compétence est utilisée

### Design
Les couleurs et la typographie sont définies dans `css/variables.css` :
- Palette de bleus professionnels
- Police Inter pour le texte
- Police JetBrains Mono pour le code
- Support automatique du mode sombre (via préférences système)

## Technologies utilisées

- HTML5 sémantique
- CSS3 moderne (CSS Variables, Flexbox, Grid)
- JavaScript vanilla (ES6+)
- Google Fonts (Inter, JetBrains Mono)
- Design responsive (mobile-first)

## Bonnes pratiques appliquées

- Accessibilité (ARIA, navigation clavier, contrastes)
- SEO de base (meta descriptions, structure sémantique)
- Performance (pas de framework lourd, assets optimisés)
- Code maintenable et documenté

## Déploiement

Le site peut être déployé gratuitement sur :
- **GitHub Pages** : Push sur un repo GitHub, activer Pages
- **Netlify** : Drag & drop du dossier ou connexion GitHub
- **Vercel** : Import du repo GitHub

## Évolutions possibles

1. **Intégration formulaire** : Connecter le formulaire de contact à Formspree, Netlify Forms ou EmailJS
2. **Blog technique** : Ajouter une section blog pour partager des articles
3. **Projets dynamiques** : Migrer vers Next.js/Astro pour génération depuis markdown
4. **Analytics** : Ajouter Plausible ou Fathom pour le suivi (respectueux de la vie privée)

## Licence

Ce code est fourni comme template. Libre d'utilisation et de modification.

---

Développé avec rigueur et méthode.
