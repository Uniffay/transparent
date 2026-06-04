#!/usr/bin/env bash
# Télécharge les images Wikimedia Commons pour les célébrités trans (CC-BY-SA)
# Usage: bash scripts/download-images.sh

set -e
DEST="public/images/celeb"
mkdir -p "$DEST"

echo "📥 Téléchargement des célébrités trans (Wikimedia Commons)..."

# Laverne Cox (CC-BY-SA 3.0)
curl -L -o "$DEST/laverne-cox.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Laverne_Cox_2024.jpg/440px-Laverne_Cox_2024.jpg"

# Elliot Page (CC-BY-SA 2.0)
curl -L -o "$DEST/elliot-page.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Elliot_Page_by_Gage_Skidmore.jpg/440px-Elliot_Page_by_Gage_Skidmore.jpg"

# Hunter Schafer (CC-BY-SA 4.0)
curl -L -o "$DEST/hunter-schafer.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Hunter_Schafer_at_the_2023_Cannes_Film_Festival.jpg/440px-Hunter_Schafer_at_the_2023_Cannes_Film_Festival.jpg"

# Kim Petras (CC-BY-SA 2.0)
curl -L -o "$DEST/kim-petras.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Kim_Petras_by_Glenn_Francis.jpg/440px-Kim_Petras_by_Glenn_Francis.jpg"

echo ""
echo "✅ Images trans téléchargées dans $DEST/"
echo ""
echo "📝 Prochaine étape : ajouter les célébrités cis (cis-1.jpg à cis-4.jpg)"
echo "   → Choisissez 4 célébrités connues et renommez leurs photos."
echo "   → Ex: Marion Cotillard, Omar Sy, Adele, Ryan Gosling"
echo "   → Placez-les dans $DEST/"
echo ""
echo "🌈 Gender Spectrum Collection (pour jeux futurs) :"
echo "   → https://genderphotos.vice.com"
echo "   → Téléchargez le pack gratuit → placez dans public/images/gsc/"
