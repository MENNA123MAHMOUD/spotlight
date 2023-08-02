"""Tests for basic interactions"""
import time
from typing import Any

from selenium.webdriver.remote.webdriver import WebDriver

from .basic_actions import select_points_similaritymap
from .helpers import (
    wait_for_tagged_element,
    get_tab,
    screenshot_exception,
)


def test_basics_clickables_available(
    webdriver: WebDriver,
    frontend_base_url: str,
    loaded_image_example_dataset: Any,
    skip_tour: None,
) -> None:
    """
    test select by rectangle in similarity map selects rows
    """
    from ._autogenerated_ui_elements import DataTestTags

    with screenshot_exception(webdriver):
        webdriver.get(frontend_base_url)
        driver = webdriver
        wait_for_tagged_element(webdriver, DataTestTags.HELP_BUTTON)
        time.sleep(1)

        num = int(
            wait_for_tagged_element(
                webdriver, DataTestTags.DATAGRID_SELECTED_COUNT
            ).text
        )

        assert num == 0

        tab = get_tab(driver, "Similarity Map")
        tab.click()

        for _ in range(20):
            time.sleep(5)  # wait for backend umap
            select_points_similaritymap(driver)
            num = int(
                wait_for_tagged_element(
                    webdriver, DataTestTags.DATAGRID_SELECTED_COUNT
                ).text
            )
            if num > 0:
                break
        assert num > 0