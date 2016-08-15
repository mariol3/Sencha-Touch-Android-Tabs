Ext.define('Ext.ux.mario.AndroidTab', {

	extend: 'Ext.TabPanel',

	xtype: 'androidtabs',

    requires: [
        'Ext.ux.touch.SwipeTabs'
    ],

	config: {
        cls: 'x-ux-androidtabs',
		tabBarPosition: 'top',
		tabBar: {
        	scrollable: 'horizontal',
            layout: {
                type: 'hbox',
                pack: 'center'
            }
    	},
    	listeners: {
            'activeitemchange': 'onTabPanelActiveItemChange'
        },
        plugins: {
            xclass: 'Ext.ux.touch.SwipeTabs',
            allowOverflow : false,
            allowDirections : [
                'left',
                'right'
            ],
            excludeTabBar: true
        }
	},

	/**
     * Centers the selected tab into the Tab Bar in an Android tabs style.
     * @private
     * @param container The TabPanel
     * @param value The new selected tab
     * @param oldValue The old selected tab
     * @param eOpts Event options
     */
    onTabPanelActiveItemChange: function (container, value, oldValue, eOpts) {
        var activeTabIndex = Ext.Array.indexOf(container.getInnerItems(), value),
            tabsNumber = container.getTabBar().getInnerItems().filter(this.notHidden).length,
            scroller = container.getTabBar().getScrollable().getScroller();

        if (this.isFirstTab(activeTabIndex)) {
            scroller.scrollTo(0, 0, true);
        }
        else if (this.isLastTab(activeTabIndex, tabsNumber)) {
            scroller.scrollToEnd(true);
        }
        else { //middle tab
            this.scrollTabToCenter(value, container);
        }
    },

    /**
     * @private
     * @param tabIndex
     * @returns {boolean}
     */
    isFirstTab: function (tabIndex) {
        return tabIndex == 0;
    },

    /**
     * @private
     * @param tabIndex
     * @param tabsNumber
     * @returns {boolean}
     */
    isLastTab: function (tabIndex, tabsNumber) {
        return tabIndex == tabsNumber-1;
    },

    /**
     * Function used to filter hidden items
     * @private
     * @param item
     * @returns {boolean}
     */
    notHidden: function (item) {
        return !item.isHidden();
    },

    /**
     * Given a middle tab, scrolls the tabs center point to the tab bar center point.
     * @private
     * @param tab
     * @param container
     */
    scrollTabToCenter: function (tab, container) {
        var tabBar = container.getTabBar(),
            tabBarWidth = tabBar.element.getWidth(),
            activeTabInitialX = this.getTabInitialXInContainer(tab, container),
            activeTabWidth = tab.tab.element.getWidth(),
            newXToScroll = Math.abs(activeTabInitialX - ((tabBarWidth/2) - (activeTabWidth/2)));

        tabBar.getScrollable().getScroller().scrollTo(newXToScroll, 0, true);
    },

    /**
     * Computes the tab X coordinate as if the scroller was scrolled to 0 coordinate.
     * The X coordinate will be the sum of all the preceeding tabs width, if any.
     * @private
     * @param tab
     * @param container
     * @returns {number}
     */
    getTabInitialXInContainer: function (tab, container) {
        var tabBar = container.getTabBar(),
            tabInitialX = 0,
            tabIndex = Ext.Array.indexOf(container.getInnerItems(), tab),
            tabsBefore = tabIndex > 0 ? tabBar.getInnerItems().slice(0, tabIndex) : [];

        for (var i = 0; i < tabsBefore.length; i++) {
            tabInitialX += tabsBefore[i].element.getWidth();
        }

        return tabInitialX;
    }

});