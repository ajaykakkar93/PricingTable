define(["qlik", "css!./style.css"], function(qlik) {
	return {
		initialProperties: {
			qHyperCubeDef: {
				qDimensions: [],
				qMeasures: [],
				qInitialDataFetch: [{
					qWidth: 10,
					qHeight: 1000
				}]
			}
		},
		definition: {
			type: "items",
			component: "accordion",
			items: {
				dimensions: {
					uses: "dimensions",
					max: 1,
					items: {
						DimSettings: {
							type: "items",
							label: "Settings",
							items: {
								bgcolor: {
									ref: "qAttributeExpressions.0.qExpression",
									label: "Background Color",
									type: "string",
									defaultValue: "linear-gradient(-45deg,#f403d1,#64b5f6)",
									component: "expression"
								},
								MyMedia: {
									ref: "qAttributeExpressions.2.qExpression",
									label: "Media",
									type: "string",
									component: "expression"
								},
								sheetNavigation: {
									type: "string",
									ref: "qAttributeExpressions.1.qExpression",
									label: "Sheet Navigation(Sheet ID)",
									//expression: "always",
									component: "expression"
								}
							}
						}
					}
				},
				measures: {
					uses: "measures",
					max: 9,
					items: {
						mesSettings: {
							label: "Measure Settings",
							type: "items",
							items: {
								Symbol: {
									ref: "qAttributeExpressions.0.qExpression",
									label: "Symbol",
									type: "string",
									defaultValue: "='$'",
									component: "expression"
								}
							}
						}
					}
				},
				sorting: {
					uses: "sorting"
				},
				settings: {
					uses: "settings",
					items: {
						ganeralSettings: {
							label: "General Settings",
							type: "items",
							items: {
								selections: {
									type: "boolean",
									label: "Selections",
									ref: "selections",
									defaultValue: false
								},
								selectionMode: {
									ref: "selectionMode",
									type: "string",
									component: "buttongroup",
									label: "Selection Mode",
									options: [{
										value: "CONFIRM",
										label: "Confirm",
										tooltip: "Confirm Selection"
									}, {
										value: "SelectOne",
										label: "Select One",
										tooltip: "Select One Value"
									}],
									defaultValue: "CONFIRM",
									show: function(d) {
										return d.selections;
									}
								},
								navigation: {
									type: "boolean",
									label: "Navigation",
									ref: "navigation",
									defaultValue: false
								},
								NavigationBtnText: {
									ref: "NavigationBtnText",
									label: "Navigation Btn Text",
									type: "string",
									defaultValue: "Details",
									show: function(d) {
										return d.navigation;
									}
								}
							}
						}
					}
				}
			}
		},
		support: {
			snapshot: true,
			export: true,
			exportData: false
		},
		paint: function($element, layout) {
			console.log(layout);
			$element.css({
				"overflow": "scroll",
				"display": "flex"
			});
			//add your rendering code here
			var html = "",
				app = qlik.currApp(),
				self = this,
				options = {
					"objid": layout.qInfo.qId,
					"navigation": layout.navigation,
					"selections": layout.selections,
					"BtnText": layout.NavigationBtnText
				};
			layout.qHyperCube.qDataPages[0].qMatrix.map(function(v, i) {
				//v[0].qText, v[1].qText, v[1].qNum
				html += `<div class="selectable container select_` + options.objid + `" select-value="` + v[0].qElemNumber + `">
					  <div class="card text-center" style="background: ` + v[0].qAttrExps.qValues["0"].qText + `;">
						<div class="title">
						  <i class="icon icon-repeat" aria-hidden="true"  style="background: ` + v[0].qAttrExps.qValues["0"].qText + `;"><img src="` + v[0].qAttrExps.qValues["2"].qText + `"></i>
						  <h2>` + v[0].qText + `</h2>
						</div>
						<div class="price">
						  <h4 value="` + v[1].qNum + `"><span>` + v[1].qAttrExps.qValues["0"].qText + `</span>` + v[1].qText + `</h4>
						</div>
						<div class="option"><ul>`;
				//<li> <i class="fa fa-check" aria-hidden="true"></i> 10 GB Space </li>
				if (v[2]) {
					html += `
								  <li> <span>` + (v[2].qAttrExps.qValues["0"].qText==undefined?'':v[2].qAttrExps.qValues["0"].qText) + `</span>` + layout.qHyperCube.qMeasureInfo[1].qFallbackTitle + ` ` + v[2].qText + ` </li>
							 `;
				}
				if (v[3]) {
					html += `
								  <li> <span>` + (v[3].qAttrExps.qValues["0"].qText==undefined?'':v[3].qAttrExps.qValues["0"].qText) + `</span>` + layout.qHyperCube.qMeasureInfo[2].qFallbackTitle + ` ` + v[3].qText + ` </li>
							 `;
				}
				if (v[4]) {
					html += `
								  <li> <span>` + (v[4].qAttrExps.qValues["0"].qText==undefined?'':v[4].qAttrExps.qValues["0"].qText) + `</span>` + layout.qHyperCube.qMeasureInfo[3].qFallbackTitle + ` ` + v[4].qText + ` </li>
							 `;
				}
				if (v[5]) {
					html += `
								  <li> <span>` + (v[5].qAttrExps.qValues["0"].qText==undefined?'':v[5].qAttrExps.qValues["0"].qText) + `</span>` + layout.qHyperCube.qMeasureInfo[4].qFallbackTitle + ` ` + v[5].qText + ` </li>
							 `;
				}
				if (v[6]) {
					html += `
								  <li> <span>` + (v[6].qAttrExps.qValues["0"].qText==undefined?'':v[6].qAttrExps.qValues["0"].qText) + `</span>` + layout.qHyperCube.qMeasureInfo[5].qFallbackTitle + ` ` + v[6].qText + ` </li>
							 `;
				}
				if (v[7]) {
					html += `
								  <li> <span>` + (v[7].qAttrExps.qValues["0"].qText==undefined?'':v[7].qAttrExps.qValues["0"].qText) + `</span>` + layout.qHyperCube.qMeasureInfo[6].qFallbackTitle + ` ` + v[7].qText + ` </li>
							 `;
				}
				if (v[8]) {
					html += `
								  <li> <span>` + (v[8].qAttrExps.qValues["0"].qText==undefined?'':v[8].qAttrExps.qValues["0"].qText) + `</span>` + layout.qHyperCube.qMeasureInfo[7].qFallbackTitle + ` ` + v[8].qText + ` </li>
							 `;
				}
				if (v[9]) {
					html += `
								  <li> <span>` + (v[9].qAttrExps.qValues["0"].qText==undefined?'':v[9].qAttrExps.qValues["0"].qText) + `</span>` + layout.qHyperCube.qMeasureInfo[8].qFallbackTitle + ` ` + v[9].qText + ` </li>
							 `;
				}
				html += `</ul></div>
						<button class="sheetid_` + options.objid + `" style="` + (options.navigation == true ? '' : 'display:none;') + `" sheetid="` + v[0].qAttrExps.qValues["1"].qText + `">` + options.BtnText + `</button>
					  </div>
					</div>`;
			});
			console.log(options);
			$element.html(html);
			if (options.navigation) {
				$(".sheetid_" + options.objid).click(function() {
					var sheetid = $(this).attr("sheetid");
					qlik.navigation.gotoSheet(sheetid);
				});
			}
			if (options.selections) {
				$element.find(".selectable").on("click", function() {
					// Get the dimension column number
					var dimCol = 0;
					// Get the dimension value index
					var dimInd = parseInt(this.getAttribute("select-value"));
					if (layout.selectionMode === "CONFIRM") {
						self.selectValues(dimCol, [dimInd], true);
						$element.find("[select-value='" + dimInd + "']").toggleClass("selected");
					} else {
						self.backendApi.selectValues(dimCol, [dimInd], true);
					}
				});
			}
			//needed for export
			return qlik.Promise.resolve();
		}
	};
});