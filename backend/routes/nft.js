import { Router } from "express";
import prisma from "../lib/prismaClient.js";


const router = Router();

// Create new PropertyNFT
router.post('/create', async (req, res) => {
  try {
    const {
      tokenId,
      contractId,
      title,
      description,
      location,
      price,
      ownerAddress,
      creatorAddress,
      transactionHash,
      isForSale,
      bedrooms,
      bathrooms,
      squareFeet,
      yearBuilt,
      amenities,
      documentHash,
      legalStatus,
      images
    } = req.body;

    const newPropertyNFT = await prisma.propertyNFT.create({
      data: {
        tokenId,
        contractId,
        title,
        description,
        location,
        price,
        ownerAddress,
        creatorAddress,
        transactionHash,
        isForSale,
        bedrooms,
        bathrooms,
        squareFeet,
        yearBuilt,
        amenities,
        documentHash,
        legalStatus,
        images
      }
    });

    res.status(201).json({
      success: true,
      message: "PropertyNFT created successfully",
      data: newPropertyNFT
    });

  } catch (error) {
    console.error('Error creating PropertyNFT:', error);
    res.status(500).json({
      success: false,
      message: "Failed to create PropertyNFT",
      error: error.message
    });
  }
});

// Get all PropertyNFTs eligible for sale
router.get('/for-sale', async (req, res) => {
  try {
    const { page = 1, limit = 10, minPrice, maxPrice, location, bedrooms, bathrooms } = req.query;
    
    const skip = (page - 1) * limit;
    const take = parseInt(limit);

    // Build where clause for filtering
    const where = {
      isForSale: true,
      legalStatus: true,
      ...(minPrice && { salePrice: { gte: parseFloat(minPrice) } }),
      ...(maxPrice && { salePrice: { ...where.salePrice, lte: parseFloat(maxPrice) } }),
      ...(location && { location: { contains: location, mode: 'insensitive' } }),
      ...(bedrooms && { bedrooms: parseInt(bedrooms) }),
      ...(bathrooms && { bathrooms: parseFloat(bathrooms) })
    };

    const [propertyNFTs, total] = await Promise.all([
      prisma.propertyNFT.findMany({
        where,
        skip,
        take,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.propertyNFT.count({ where })
    ]);

    res.status(200).json({
      success: true,
      message: "PropertyNFTs for sale retrieved successfully",
      data: propertyNFTs,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / take),
        totalItems: total,
        itemsPerPage: take
      }
    });

  } catch (error) {
    console.error('Error fetching PropertyNFTs for sale:', error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch PropertyNFTs for sale",
      error: error.message
    });
  }
});

// Get PropertyNFT by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const propertyNFT = await prisma.propertyNFT.findUnique({
      where: {
        id: id
      }
    });

    if (!propertyNFT) {
      return res.status(404).json({
        success: false,
        message: "PropertyNFT not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "PropertyNFT retrieved successfully",
      data: propertyNFT
    });

  } catch (error) {
    console.error('Error fetching PropertyNFT by ID:', error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch PropertyNFT",
      error: error.message
    });
  }
});

// Get PropertyNFT by tokenId (alternative search)
router.get('/token/:tokenId', async (req, res) => {
  try {
    const { tokenId } = req.params;

    const propertyNFT = await prisma.propertyNFT.findUnique({
      where: {
        tokenId: parseInt(tokenId)
      }
    });

    if (!propertyNFT) {
      return res.status(404).json({
        success: false,
        message: "PropertyNFT not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "PropertyNFT retrieved successfully",
      data: propertyNFT
    });

  } catch (error) {
    console.error('Error fetching PropertyNFT by tokenId:', error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch PropertyNFT",
      error: error.message
    });
  }
});

// Get all PropertyNFTs (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, owner, creator, location } = req.query;
    
    const skip = (page - 1) * limit;
    const take = parseInt(limit);

    const where = {
      ...(owner && { ownerAddress: owner }),
      ...(creator && { creatorAddress: creator }),
      ...(location && { location: { contains: location, mode: 'insensitive' } })
    };

    const [propertyNFTs, total] = await Promise.all([
      prisma.propertyNFT.findMany({
        where,
        skip,
        take,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.propertyNFT.count({ where })
    ]);

    res.status(200).json({
      success: true,
      message: "PropertyNFTs retrieved successfully",
      data: propertyNFTs,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / take),
        totalItems: total,
        itemsPerPage: take
      }
    });

  } catch (error) {
    console.error('Error fetching PropertyNFTs:', error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch PropertyNFTs",
      error: error.message
    });
  }
});

export default router;