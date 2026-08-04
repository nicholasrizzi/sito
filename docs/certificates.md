# Certificati PDF con anteprima

La pagina "Certificazioni e licenze" (`exampleSite/content/page/certificates/`) è un
[page bundle](https://gohugo.io/content-management/page-bundles/) Hugo: nella stessa
cartella di `index.md` vivono i PDF originali dei certificati e una miniatura JPG
generata dalla loro prima (e unica) pagina.

## Perché così

Un PDF incorporato con `<iframe>`/`<embed>` non si vede in modo affidabile su mobile
(iOS/Android spesso non lo renderizzano). Meglio una miniatura statica che apre il PDF
vero in una nuova scheda, dove il visualizzatore nativo del browser funziona sempre.

## Struttura

```
exampleSite/content/page/certificates/
├── index.md                  # contenuto della pagina + shortcode
├── dante-livello-1.pdf        # certificato originale
├── dante-livello-1.jpg        # miniatura (generata, ~480px di larghezza)
└── ...
```

Convenzione dei nomi: minuscolo, senza spazi né date (`brand-nome-livello.pdf`),
con il file `.jpg` che ha **lo stesso nome** del `.pdf` corrispondente — lo shortcode
lo trova sostituendo l'estensione.

## Shortcode

- `{{< cert-grid >}} ... {{< /cert-grid >}}` — dispone i certificati contenuti in una griglia.
- `{{< certificate pdf="nome.pdf" title="Titolo" date="giorno mese anno" >}}` —
  una card cliccabile: mostra `nome.jpg` come anteprima e apre `nome.pdf` in una nuova
  scheda. Definiti in `layouts/shortcodes/certificate.html` e `cert-grid.html`.

## Come aggiungere un nuovo certificato

1. Copia il PDF nella cartella `exampleSite/content/page/certificates/`, rinominandolo
   secondo la convenzione sopra (es. `avixa-nuovo-corso.pdf`).
2. Genera la miniatura (richiede `pdftoppm` di poppler e `convert` di ImageMagick,
   installabili con `brew install poppler imagemagick`):
   ```bash
   cd exampleSite/content/page/certificates
   pdftoppm -jpeg -r 100 -singlefile avixa-nuovo-corso.pdf avixa-nuovo-corso_full
   convert avixa-nuovo-corso_full.jpg -resize 480x -quality 78 avixa-nuovo-corso.jpg
   rm avixa-nuovo-corso_full.jpg
   ```
3. In `index.md`, aggiungi una riga dentro il blocco `cert-grid` giusto (o creane uno
   nuovo per un nuovo brand):
   ```
   {{< certificate pdf="avixa-nuovo-corso.pdf" title="AVIXA — Nuovo corso" date="1 gennaio 2026" >}}
   ```
4. Verifica con `cd exampleSite && hugo server --themesDir ../.. -D` che la card e il
   link al PDF funzionino.

Se non hai `pdftoppm`/`convert` a disposizione, basta chiedere: PDF alla mano, il resto
si fa in automatico.
