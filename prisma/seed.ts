// @ts-nocheck
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  // Income Categories
  const business = await prisma.transactionCategory.upsert({
    where: { name_type: {name: "Business", type: "income"}},
    update: {
      name: "Business",
      type: "income",
    },
    create: {
      name: "Business",
      type: "income",
    },
  });
  const extraIncome = await prisma.transactionCategory.upsert({
    where: { name_type: {name: "Extra Income", type: "income" }},
    update: {
      name: "Extra Income",
      type: "income",
    },
    create: {
      name: "Extra Income",
      type: "income",
    },
  });
  const gift = await prisma.transactionCategory.upsert({
    where: { name_type:{name: "Gift", type: "income" }},
    update: {
      name: "Gift",
      type: "income",
    },
    create: {
      name: "Gift",
      type: "income",
    },
  });
  const interestDividend = await prisma.transactionCategory.upsert({
    where: {  name_type:{ name: "Interest, Dividend", type: "income" }},
    update: {
      name: "Interest, Dividend",
      type: "income",
    },
    create: {
      name: "Interest, Dividend",
      type: "income",
    },
  });
  const salary = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Salary", type: "income" }},
    update: {
      name: "Salary",
      type: "income",
    },
    create: {
      name: "Salary",
      type: "income",
    },
  });
  const other = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Other", type: "income" }},
    update: {
      name: "Other",
      type: "income",
    },
    create: {
      name: "Other",
      type: "income",
    },
  });
  const custom = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Custom", type: "income" }},
    update: {
      name: "Custom",
      type: "income",
    },
    create: {
      name: "Custom",
      type: "income",
    },
  });
  // Expense Categories
  const meal = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Meal", type: "expense" }},
    update: {
      name: "Meal",
      type: "expense",
    },
    create: {
      name: "Meal",
      type: "expense",
    },
  });
  const grocery = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Grocery", type: "expense" }},
    update: {
      name: "Grocery",
      type: "expense",
    },
    create: {
      name: "Grocery",
      type: "expense",
    },
  });
  const shopping = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Shopping", type: "expense" }},
    update: {
      name: "Shopping",
      type: "expense",
    },
    create: {
      name: "Shopping",
      type: "expense",
    },
  });
  const transportation = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Transportation", type: "expense" }},
    update: {
      name: "Transportation",
      type: "expense",
    },
    create: {
      name: "Transportation",
      type: "expense",
    },
  });
  const bankTransfer = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Bank Transfer", type: "expense" }},
    update: {
      name: "Bank Transfer",
      type: "expense",
    },
    create: {
      name: "Bank Transfer",
      type: "expense",
    },
  });
  const entertainment = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Entertainment", type: "expense" }},
    update: {
      name: "Entertainment",
      type: "expense",
    },
    create: {
      name: "Entertainment",
      type: "expense",
    },
  });
  const housing = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Housing", type: "expense" }},
    update: {
      name: "Housing",
      type: "expense",
    },
    create: {
      name: "Housing",
      type: "expense",
    },
  });
  const travel = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Travel", type: "expense" }},
    update: {
      name: "Travel",
      type: "expense",
    },
    create: {
      name: "Travel",
      type: "expense",
    },
  });
  const phoneAndInternet = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Phone & Internet", type: "expense" }},
    update: {
      name: "Phone & Internet",
      type: "expense",
    },
    create: {
      name: "Phone & Internet",
      type: "expense",
    },
  });
  const personalCare = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Personal Care", type: "expense" }},
    update: {
      name: "Personal Care",
      type: "expense",
    },
    create: {
      name: "Personal Care",
      type: "expense",
    },
  });
  const healthCare = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Health Care", type: "expense" }},
    update: {
      name: "Health Care",
      type: "expense",
    },
    create: {
      name: "Health Care",
      type: "expense",
    },
  });
  const education = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Education", type: "expense" }},
    update: {
      name: "Education",
      type: "expense",
    },
    create: {
      name: "Education",
      type: "expense",
    },
  });
  const expenseGift = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Gift", type: "expense" }},
    update: {
      name: "Gift",
      type: "expense",
    },
    create: {
      name: "Gift",
      type: "expense",
    },
  });
  const pet = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Pet", type: "expense" }},
    update: {
      name: "Pet",
      type: "expense",
    },
    create: {
      name: "Pet",
      type: "expense",
    },
  });
  const insurance = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Insurance", type: "expense" }},
    update: {
      name: "Insurance",
      type: "expense",
    },
    create: {
      name: "Insurance",
      type: "expense",
    },
  });
  const children = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Children", type: "expense" }},
    update: {
      name: "Children",
      type: "expense",
    },
    create: {
      name: "Children",
      type: "expense",
    },
  });
  const debt = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Debt", type: "expense" }},
    update: {
      name: "Debt",
      type: "expense",
    },
    create: {
      name: "Debt",
      type: "expense",
    },
  });
  const utility = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Utility", type: "expense" }},
    update: {
      name: "Utility",
      type: "expense",
    },
    create: {
      name: "Utility",
      type: "expense",
    },
  });
  const retirement = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Retirement", type: "expense" }},
    update: {
      name: "Retirement",
      type: "expense",
    },
    create: {
      name: "Retirement",
      type: "expense",
    },
  });
  const tithe = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Tithe", type: "expense" }},
    update: {
      name: "Tithe",
      type: "expense",
    },
    create: {
      name: "Tithe",
      type: "expense",
    },
  });
  const tax = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Tax", type: "expense" }},
    update: {
      name: "Tax",
      type: "expense",
    },
    create: {
      name: "Tax",
      type: "expense",
    },
  });

  const otherExpense = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Other", type: "expense" }},
    update: {
      name: "Other",
      type: "expense",
    },
    create: {
      name: "Other",
      type: "expense",
    },
  });
  const customExpense = await prisma.transactionCategory.upsert({
    where: {  name_type:{name: "Custom", type: "expense" }},
    update: {
      name: "Custom Expense",
      type: "expense",
    },
    create: {
      name: "Custom Expense",
      type: "expense",
    },
  });

  console.log({
    business,
    extraIncome,
    gift,
    interestDividend,
    salary,
    other,
    custom,
  });
  console.log({
    meal,
    grocery,
    shopping,
    bankTransfer,
    transportation,
    entertainment,
    housing,
    travel,
    phoneAndInternet,
    personalCare,
    healthCare,
    education,
    expenseGift,
    pet,
    insurance,
    children,
    debt,
    utility,
    retirement,
    tithe,
    tax,
    otherExpense,
    customExpense,
  });
}
main().then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
