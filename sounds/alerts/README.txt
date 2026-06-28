Put your ALARM sounds here (these play when a timer ends).
These are SEPARATE from the ambient background sounds in the /sounds folder.

Required filenames (the Alerts tab loads these by name):
  bell.mp3
  digital.mp3
  chime.mp3
  kitchen.mp3
  birds.mp3

Tips:
- Must be .mp3 and named exactly as above.
- Short clips work best (1-4 seconds).
- To add MORE alarm options: drop the .mp3 in here, then open index.html and
  add an entry to the ALERT_SOUNDS list near the top of the <script>, e.g.:
      { name: "Marimba", file: "marimba.mp3" },
- Until you add files, the alarm falls back to a built-in "ding" beep, so the
  timer still alerts you. The Preview buttons will use the beep too.
- You can delete this README once your sounds are in.
