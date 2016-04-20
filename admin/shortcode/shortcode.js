(function() {
   tinymce.create('tinymce.plugins.languagebutton', {
      init : function(ed, url) {
         ed.addButton('languagebutton', {
            title : 'Language Button',
            image : url+'/language-button.png',
            onclick : function() {
            	// triggers the thickbox
				var width = jQuery(window).width(), H = jQuery(window).height(), W = ( 720 < width ) ? 720 : width;
				W = W - 80;
				H = H - 84;
				tb_show( 'Language Button', '#TB_inline?width=' + W + '&height=' + H + '&inlineId=languagebutton-form' );
            }
         });
      },
      createControl : function(n, cm) {
         return null;
      },
      getInfo : function() {
         return {
            longname : "Language Button",
            author : 'Subhransu Sekhar',
            authorurl : 'http://subhransusekhar.com',
            infourl : 'https://github.com/subhransusekhar/data-visualizer',
            version : "1.0"
         };
      }
   });
   tinymce.PluginManager.add('languagebutton', tinymce.plugins.languagebutton);

// executes this when the DOM is ready
	jQuery(function(){
		// creates a form to be displayed everytime the button is clicked
		var form = jQuery('<div id="languagebutton-form"><table id="languagebutton-table" class="form-table">\
			<tr>\
				<th><label for="languagebutton-type">Language</label></th>\
				<td><input type="text" name="type" id="languagebutton-type" value="en" />\
				<small>specify the language type.</small></td>\
			</tr>\
			<tr>\
				<th><label for="languagebutton-dom">Element Type</label></th>\
				<td><input type="text" name="dom" id="languagebutton-dom" value="span" />\
        <small>specify the element type.</small></td>\
			</tr>\
			</tr>\
		</table>\
		<p class="submit">\
			<input type="button" id="languagebutton-submit" class="button-primary" value="Insert Language" name="submit" />\
		</p>\
		</div>');

		var table = form.find('table');
		form.appendTo('body').hide();
		// handles the click event of the submit button
		form.find('#languagebutton-submit').click(function(){
			// defines the options and their default values
			// again, this is not the most elegant way to do this
			// but well, this gets the job done nonetheless
			var options = {
				'type'    : 'en',
				'dom'     : 'span',
				};
			var shortcode = '[language';
      var selected_text = tinyMCE.activeEditor.selection.getContent();

			for( var index in options) {
				var value = table.find('#languagebutton-' + index).val();

				// attaches the attribute to the shortcode only if it's different from the default value
				if ( value !== options[index] )
					shortcode += ' ' + index + '="' + value + '"';
			}

			shortcode += ']';
      shortcode += selected_text;
      shortcode += '[/language]';
			// inserts the shortcode into the active editor
			tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);

			// closes Thickbox
			tb_remove();
		});
	});

})();
