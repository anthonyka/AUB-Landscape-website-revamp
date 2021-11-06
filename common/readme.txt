Add in this folder all the common/reusable elements.
Ex: header.html, footer.html etc.

You can then reuse it in other pages like this:
$(.nav_container).load(./common/navbar.html);
