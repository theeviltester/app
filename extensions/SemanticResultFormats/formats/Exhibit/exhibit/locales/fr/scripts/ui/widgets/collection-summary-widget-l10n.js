jsWC=window.jsWC || {}; jsWC["./extensions/SemanticResultFormats/formats/Exhibit/exhibit/locales/fr/scripts/ui/widgets/collection-summary-widget-l10n.js"]=1071;

/*==================================================
 *  Exhibit.CollectionSummaryWidget French localization
 *==================================================
 */

if (!("l10n" in Exhibit.CollectionSummaryWidget)) {
    Exhibit.CollectionSummaryWidget.l10n = {};
}

Exhibit.CollectionSummaryWidget.l10n.resetFiltersLabel = "Réinitialiser tous les filtres";
Exhibit.CollectionSummaryWidget.l10n.resetFiltersTooltip = "Retirer tous les filtres et voir les items d'origine";
Exhibit.CollectionSummaryWidget.l10n.resetActionTitle = "Retirer tous les filtres";

Exhibit.CollectionSummaryWidget.l10n.allResultsTemplate =
    "<span class='%0' id='resultDescription'></span>";

Exhibit.CollectionSummaryWidget.l10n.noResultsTemplate =
    "<span class='%0'><span class='%1'>0</span> résultats</span> (<span id='resetActionLink'></span>)";

Exhibit.CollectionSummaryWidget.l10n.filteredResultsTemplate =
    "<span class='%0' id='resultDescription'></span> " +
    "filtrés sur un total de <span id='originalCountSpan'>0</span> items (<span id='resetActionLink'></span>)";
