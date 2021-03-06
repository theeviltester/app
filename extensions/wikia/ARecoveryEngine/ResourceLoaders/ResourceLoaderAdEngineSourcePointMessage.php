<?php

class ResourceLoaderAdEngineSourcePointMessage extends ResourceLoaderAdEngineSourcePointBase {
	// increase this any time the local files change
	const CACHE_BUSTER = 0;
	const SCRIPT_URL = 'https://api.sourcepoint.com/script/msg?v=1';
	const FALLBACK_SCRIPT_URL = __DIR__ . '/../js/SourcePoint/msg_fallback.js';
}
