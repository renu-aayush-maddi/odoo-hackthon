import Warehouse from "../models/warehouse.model.js";

export const createWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.create(req.body);
    res.status(201).json(warehouse);
  } catch (error) {
    console.log("createWarehouse error", error.message);
    res.status(400).json({ message: error.message });
  }
};

export const getWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find().sort({ createdAt: -1 });
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWarehouseById = async (req, res) => {
  try {
    const w = await Warehouse.findById(req.params.id);
    if (!w) return res.status(404).json({ message: "Warehouse not found" });
    res.json(w);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateWarehouse = async (req, res) => {
  try {
    const w = await Warehouse.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!w) return res.status(404).json({ message: "Warehouse not found" });
    res.json(w);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteWarehouse = async (req, res) => {
  try {
    const w = await Warehouse.findByIdAndDelete(req.params.id);
    if (!w) return res.status(404).json({ message: "Warehouse not found" });
    res.json({ message: "Warehouse deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
