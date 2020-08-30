# Paperleaf

The theme for [Ghost](http://github.com/tryghost/ghost/).

To download, visit our [site](https://www.nvslbs.com).

## Search setup

Go to Integrations settings then click on + Add custom integration. Add custom name like “GhostHunter” then click on “Create” button. Now you copy Content API key and then add it to Code injection settings in Site Header section like this:

``
<script>
  // Replace YOUR API KEY with your actual key
  var ghosthunter_key = 'YOUR API KEY';
</script>
``

Example:
``
<script>
  var ghosthunter_key = 'c84b9745532df6251f4b320fbd';
</script>
``
