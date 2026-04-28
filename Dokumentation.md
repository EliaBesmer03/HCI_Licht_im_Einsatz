# Projektdokumentation: Web-AR Prototyp "Licht im Einsatz"

## 1. Projektübersicht
Diese Dokumentation beschreibt den vollständigen Workflow zur Erstellung des Web-AR-Prototypen **"Licht im Einsatz – Evolution der Feuerwehrbeleuchtung"**. Der Prototyp demonstriert drei historische Phasen der Beleuchtungstechnik (Karbidlaterne, explosionsgeschützte Handlampe, moderne LED-Leuchte) und macht diese mittels Augmented Reality erlebbar. 

Die Applikation wurde plattformunabhängig als Web-AR-Erlebnis entwickelt und unterstützt:
- **iOS / iPadOS:** Nativ über AR Quick Look (mittels `.usdz`-Format)
- **Android:** Nativ über Google Scene Viewer (mittels `.glb`-Format)

---

## 2. 3D-Workflow: Von Blender zum Web-Format

Um eine optimale Performance auf mobilen Endgeräten zu gewährleisten, müssen die 3D-Modelle für das Web optimiert exportiert werden.

### Schritt 2.1: Vorbereitung in Blender
1. **Modellierung & Cleanup:** Die Modelle wurden in Blender aufbereitet. Nicht sichtbare Geometrie wurde entfernt, um die Polygonanzahl (Polycount) für mobile Endgeräte niedrig zu halten.
2. **Materialien & Texturen:** Es wurde ein strikter PBR-Workflow (Physically Based Rendering) angewendet. Materialien bestehen aus *Base Color*, *Roughness*, *Metallic* und *Normal Maps*. Dies ist entscheidend, damit die Lampen in der AR-Ansicht realistisch auf die reale Umgebungsbeleuchtung reagieren.
3. **Skalierung:** Die Dimensionen (Scale) wurden in Blender angewendet (`Ctrl + A` -> `Scale`), damit die Lampen in der AR-Ansicht lebensgross (1:1) erscheinen.

### Schritt 2.2: Export für Android (.glb)
Das glTF/GLB-Format ist der Standard für 3D im Web und wird von Androids Scene Viewer verwendet.
- **Aktion:** `File` > `Export` > `glTF 2.0 (.glb / .gltf)`
- **Einstellungen:** 
  - Format: `glTF Binary (.glb)`
  - Include: `Selected Objects` (um nur die Lampe zu exportieren)
  - Transform: `Y Up` (Standard für Web-3D)
  - Geometry: `Apply Modifiers`

### Schritt 2.3: Export für iOS (.usdz)
Apple-Geräte benötigen für AR Quick Look zwingend das Apple-eigene `.usdz`-Format.
- Da Blender den USDZ-Export nicht immer fehlerfrei nativ unterstützt, wurde die aus Blender exportierte `.glb`-Datei mittels Apple-Tools (wie *Reality Converter* oder dem Command-Line-Tool *usdpython*) verlustfrei in das `.usdz`-Format konvertiert.

---

## 3. Integration in die Website

Die Einbindung der 3D-Modelle in die Website erfolgt über die Open-Source Web Component `<model-viewer>` von Google. Diese Bibliothek erkennt automatisch das Betriebssystem und öffnet den entsprechenden nativen AR-Viewer.

### HTML-Implementierung
Auf den AR-Ansichtsseiten (`ar-karbid.html`, `ar-explosion.html`, `ar-handlampe.html`) wurde folgender Code implementiert:

```html
<model-viewer
    src="modelle/karbidlaterne.glb"
    ios-src="modelle/karbidlaterne.usdz"
    alt="Karbidlaterne 3D-Modell"
    ar
    ar-modes="scene-viewer webxr quick-look"
    camera-controls
    auto-rotate
    shadow-intensity="0.8"
    scale="0.6 0.6 0.6">
    
    <!-- Angepasster AR-Button im Premium-Design -->
    <button slot="ar-button" class="ar-slot-btn">
        <svg>...</svg> <!-- AR Cube Icon -->
        In AR ansehen
    </button>
</model-viewer>
```

**Erklärung der wichtigsten Parameter:**
- `src`: Pfad zur `.glb` Datei für Android & Desktop.
- `ios-src`: Pfad zur `.usdz` Datei, essenziell für das Funktionieren auf iPhones.
- `ar`: Aktiviert die AR-Fähigkeit der Komponente.
- `ar-modes`: Legt die Priorität der AR-Engines fest.
- `slot="ar-button"`: Überschreibt den Standard-Button mit einem eigenen, im Design-System verankerten "Frosted Glass"-Button.
- `scale="0.6 0.6 0.6"`: Verkleinert die Darstellung im Web-Browser für eine harmonischere UI-Integration.

Zusätzlich wurden auf den **Detailseiten** miniaturisierte Instanzen des `<model-viewer>` mit `auto-rotate` eingebunden, die als dynamische 3D-Profilbilder der Lampen dienen.

---

## 4. Testing & Deployment

### Lokales Testing
Während der Entwicklung wurde die Anwendung lokal über einen Node.js Server (`npx serve`) gehostet.
- **Problem:** Bei der Nutzung des Tunneling-Dienstes `ngrok` zur Übertragung auf das iPhone blockierte die "Warning"-Seite der kostenlosen ngrok-Version den AR Quick Look Hintergrundprozess von iOS.
- **Lösung:** Das Testing wurde erfolgreich direkt über die lokale Netzwerk-IP (z.B. `http://10.255.137.57:3000`) auf dem iPhone durchgeführt, was eine nahtlose Ausführung des AR Quick Look ermöglichte.

### Screenshots vom Endgerät (iOS)
*(Hinweis: Füge hier die Screenshots ein, die du von der Website und der AR-Ansicht auf deinem iPhone gemacht hast, wie in der Aufgabenstellung gefordert.)*

1. **Screenshot Home / Timeline:**
   `[Hier Screenshot einfügen]`

2. **Screenshot AR-Ansicht (Web):**
   `[Hier Screenshot einfügen]`

3. **Screenshot Native AR (Lampe im Raum):**
   `[Hier Screenshot einfügen]`

---

## 5. Fazit
Der Workflow von der 3D-Aufbereitung bis zur Web-Integration konnte erfolgreich abgeschlossen werden. Durch die Bereitstellung beider Formate (GLB und USDZ) ist eine hohe Cross-Plattform-Kompatibilität garantiert. Die Bedienung der Web-Applikation fühlt sich durch das eigens entwickelte UI-System (CSS) nativ an.
