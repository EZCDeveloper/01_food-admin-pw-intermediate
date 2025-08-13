# 1. Orders

## TC-1.1.1. Export a CSV File Successfully

**Description**

📌 **Description:**

📌 **Preconditions:**

- The user must be authenticated and on the **Order Management** page.
- There must be at least **one registered order** in the database.

📌 **Expected Result:**

- A `.csv` file is downloaded with the correct format and a valid date in its name.

📌 **Steps:**

1. Navigate to “Orders” menu.
2. Click on the **"Export to CSV"** button.
3. Wait for the file download to start.
4. Verify that the downloaded file has a **.csv** extension.
5. Verify that the file name follows the expected format of UUID V4.

**1.1. Export Orders by CSV file**

---

## TC-1.1.2. Verify That the CSV Content Is Correct

**Description**

📌 **Description:**

- **Given** the user is logged in as an administrator or restaurant employee
- **When** they click on the **"Export to CSV"** button
- **Then** a `.csv` file should be generated and downloaded with the correct format and a valid date in its name

📌 **Preconditions:**

- **Orders must be registered** in the system before the export.

📌 **Expected Result:**

- The CSV file must contain data corresponding to the orders registered in the application.

📌 **Steps:**

1. Navigate to “Orders” page.
2. Click on the **"Export to CSV"** button.
3. Download and open the CSV file.
4. Verify that the first row contains the correct headers (`id, amount, orderNumber, status, store, user`).
5. Verify that exists at least 1 order.
