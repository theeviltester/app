<?php

/**
 * AssetsConfig
 * 
 * In this class word 'item' stands for single entry in configuration array while 'asset' stand for specific path or url
 *
 * @author Inez Korczyński <korczynski@gmail.com>
 */

class AssetsConfig {
	
	public static function getRTEAssets($combine) {
		global $IP;

		$files = array();
		
		if($combine) {
			$input = file_get_contents($IP . '/extensions/wikia/RTE/ckeditor/ckeditor.wikia.pack');
			$input = substr($input, strpos($input, 'files :') + 7);
			$input = trim($input, " \n\t[]{}");
			
			// CK core files
			$files[] = 'extensions/wikia/RTE/ckeditor/_source/core/ckeditor_base.js';
			
			// get all *.js files
			if (preg_match_all('%[^/]\'([^\']+).js%', $input, $matches, PREG_SET_ORDER)) {
				foreach($matches as $match) {
					$name = $match[1] . '.js';
					$files[] = 'extensions/wikia/RTE/ckeditor/' . $name;
				}
			}
		} else {
			$files[] = 'extensions/wikia/RTE/ckeditor/ckeditor_source.js';
			$files[] = 'extensions/wikia/RTE/js/RTE.js';
		}
		
		return $files;		
	}
	
	private /* array */ $mConfig;
	
	/**
	 * Returns configuration array for particular group. If group does not exists in config then returns empty array
	 * 
	 * @author Inez Korczyński <korczynski@gmail.com>
 	 */
	protected function getGroupConfig($groupName) {
		if(empty($this->mConfig)) {
			include('config.php');
			$this->mConfig = $config;
		}
		
		if(isset($this->mConfig[$groupName])) {
			return $this->mConfig[$groupName];
		} else {
			return array();
		}
	}

	/**
	 * Based on the group name get items assigned to it and pass to resolveItemsToAssets mathod for resolving into particular assets
	 * 
	 * @author Inez Korczyński <korczynski@gmail.com>
 	 */
	public function resolve(/* string */ $groupName, /* boolean */ $combine = true, /* boolean */ $minify = true, /* array */ $params = array()) {
		return $this->resolveItemsToAssets($this->getGroupConfig($groupName), $combine, $minify, $params);
	}

	/**
	 * Based on the array of items resolves it into array of assets
	 * Parameters $combine, $minify and $params are eventually passed to custom function (look at #function_) which may deliver different set of assets based on them 
	 * 
	 * @author Inez Korczyński <korczynski@gmail.com>
 	 */
	private function resolveItemsToAssets(/* array */ $items, /* boolean */ $combine, /* boolean */ $minify, /* array */ $params) {

		$assets = array();
		
		foreach($items as $item) {
			if(substr($item, 0, 2) == '//') {

				// filepath - most typical case				
				$assets[] = substr($item, 2);				
			
			} else if(substr($item, 0, 7) == '#group_') {

				// reference to another group
				$assets = array_merge($assets, $this->resolve(substr($item, 7)));			

			} else if(substr($item, 0, 10) == '#function_') {

				// reference to a function that returns array of URIs
				$assets = array_merge($assets, call_user_func(substr($item, 10), $combine, $minify, $params));			

			} else if(substr($item, 0, 7) == 'http://') {
				
				// reference to remote file (only http, not https)
				$assets[] = $item;
				
			}
		}
		
		return $assets;
	}
	
}
