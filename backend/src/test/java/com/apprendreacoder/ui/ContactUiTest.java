package com.apprendreacoder.ui;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;

import static org.assertj.core.api.Assertions.assertThat;


public class ContactUiTest {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeAll
    static void setupClass() {
        WebDriverManager.chromedriver().setup();

    }

    @BeforeEach
    void setup() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, java.time.Duration.ofSeconds(20));
    }
    @AfterEach
    void teardown() {
      if (driver != null)
          driver.quit();
    }

    @Test
    void shouldCreateAndDeleteContactFromUI() {
        driver.get("http://localhost:5173/");

        typeByPlaceholder("Nom *", "TestNom");
        typeByPlaceholder("Prénom *", "TestPrenom");
        typeByPlaceholder("Téléphone *", "0600000000");
        typeByPlaceholder("Email", "test@demo.com");
        typeByPlaceholder("Intitulé de poste", "Dev");
        typeByPlaceholder("Direction", "DSI");
        typeByPlaceholder("Bureau", "A01");

        driver.findElement(By.xpath("//button[normalize-space()='Créer']")).click();

        typeByPlaceholder("Rechercher par nom…", "TestNom");

        WebElement row = wait.until(ExpectedConditions.presenceOfElementLocated( // [29]
                By.xpath("//*[contains(.,'TestNom') and contains(.,'TestPrenom')]")
        ));
        assertThat(row).isNotNull();

        WebElement deleteBtn = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//button[normalize-space()='Supprimer']")
        ));
        deleteBtn.click();

        wait.until(ExpectedConditions.invisibilityOfElementLocated( // [33]
                By.xpath("//*[contains(text(),'TestNom') and contains(text(),'TestPrenom')]")
        ));

    }
    private void typeByPlaceholder(String placeholder, String value) {
        WebElement input = wait.until(ExpectedConditions.presenceOfElementLocated(
                By.xpath("//input[@placeholder='" + placeholder + "']")));
        input.clear();
        input.sendKeys(value);
    }
}
