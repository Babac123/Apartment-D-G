<?php


namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class Portfolio extends AbstractController
{

    /**
     * @Route({"/portfolio"}, name="portfolio")
     * @return Response
     */
    public function portfolioAction()
    {
        return $this->render('portfolio/index.html.twig');
    }

}