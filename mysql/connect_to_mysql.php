                             		
<?php 


   $db_host="silo.cs.indiana.edu:33230";

   $db_username="joeyep";
   $db_pass="password";
   $db_name="login";

mysql_connect("db_host","$db_username","$db_pass") or die(mysql_error());
mysql_select_db("$db_name") or die("no database by that name");
?>



